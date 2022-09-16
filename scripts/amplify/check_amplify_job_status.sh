#!/bin/bash
# Maintainer: andrei.varga@craftingsoftware.com
#
#  CONTEXT:
# - When merging anything to the production branch, AWS Amplify triggers a deployment.
#   The response of /get-job API call on aws amplify includes the commit ID based on which the deployment was built.
# - Before incrementing the version, it's required to validate that both commit IDs match when the workflow runs.
#   When the commit IDs don't match, the version increment must not happen, as one of the following scenarios may apply:
#   1. Latest prod branch change (eg: PR merge, hot-fix, etc) is not yet deployed in Amplify
#      -> Possible reasons: network communication failure, aws services failure, etc...
#      -> When this happens, a manual rebuild in AWS Amplify console is required, followed by a manual run of this workflow
#   2. Someone changed the prod branch during the time between the start of this workflow and the commit ID check happens
#      -> This means a concurrent run of this workflow can happen (one for the previous trigger change, one for current)
#         which can lead to inaccurate versioning
#      -> Currently this workflow has no concurrency settings in place

# Required envs - injected from workflow
PROD_BRANCH="${PROD_BRANCH:-}"

# Keeping the check as a loop in case multiple envs are injected in the future
for env in PROD_BRANCH
do
    [[ -z ${!env} ]] && echo "[ERROR] Missing required env: ${env}" && _Q=1
done
[[ ${_Q} == 1 ]] && echo "Aborting..." && exit 1

echo "## PROD_LATEST_COMID: ${PROD_LATEST_COMID}"

# Get last commit ID in project's production branch
get_last_commit_id_in_prod_branch() {
  echo ""
  echo "[INFO] Getting the latest commit ID from GIT in branch: \"${PROD_BRANCH}\" ..."
  PROD_LATEST_COMID=$(git log origin/${PROD_BRANCH} -1 --format='%H') || { echo "[ERROR] Cannot get latest commit ID in branch: ${PROD_BRANCH} | Command that failed: \"git log ${PROD_BRANCH} -1 --format='%H'\"" ; exit 1 ; }
  echo -e "  --> Branch: ${PROD_BRANCH}"
  echo -e "  --> Commit ID: ${PROD_LATEST_COMID}"
}

# Get commit ID based on which current latest AWS Amplify deployment is built
get_commit_id_of_current_amplify_deployment() {
  echo ""
  echo "[INFO] Getting commit ID used for current AWS Amplify deployment..."
  AMP_APPID=$(aws amplify list-apps --no-paginate | jq -r '.apps[] | select (.repository=="https://github.com/crafting-software/crafters_guild_hall_web").appId') || exit 1
  AMP_BRANCH=$(aws amplify list-apps --no-paginate | jq -r '.apps[] | select (.repository=="https://github.com/crafting-software/crafters_guild_hall_web").productionBranch.branchName') || exit 1
  AMP_LSTJOB_JSON="/tmp/amp_list_job.json"
  aws amplify list-jobs --branch-name ${AMP_BRANCH} --app-id ${AMP_APPID} --max-items 1 > ${AMP_LSTJOB_JSON} || exit 1
  AMP_BUILD_ID=$(jq -r '.jobSummaries[].jobId' ${AMP_LSTJOB_JSON}) || exit 1
  AMP_COMM_ID=$(jq -r '.jobSummaries[].commitId' ${AMP_LSTJOB_JSON}) || exit 1
  echo -e "    -- Amplify build number: ${AMP_BUILD_ID}"
  echo -e "    -- Build initiated from branch: ${AMP_BRANCH}"
  echo -e "    -- Build Commit ID: ${AMP_COMM_ID}"
  rm -f ${AMP_LSTJOB_JSON}
}

# Compare commit IDs
compare_commit_ids() {
  echo ""
  if [[ "${PROD_LATEST_COMID}" != "${AMP_COMM_ID}" ]]; then
    echo "[ERROR] Commit IDs don't match"
    echo -e "  --> Git Hub commit ID: ${PROD_LATEST_COMID}"
    echo -e "  --> Amplify commit ID: ${AMP_COMM_ID}"
    echo "Aborting..."
    exit 1
  fi
}

# Check status of current latest AWS Amplify deployment
check_amplify_job_status() {
  echo ""
  echo "[INFO] Checking deployment job status for AWS Amplify Build #${AMP_BUILD_ID}..."
  # Start counter
  _COUNT=0
  # Recheck interval (seconds)
  _RCHK=10
  # Timeout = 10m (600s) | 600s/$_RCHK=60
  _TO=60
  # This env is set according to job status(es), script determines whether to exit with 0 or 1 based on this
  _BREAK=0
  while [[ "${_COUNT}" -le ${_TO} ]]
  do
      if [[ "${_COUNT}" == "${_TO}" ]]; then
          echo -e "[ERROR] Timeout reached while waiting for a successful deployment status"
          _COUNT=5000
          _BREAK=1
          break
      fi
      JOBSTS=$(aws amplify list-jobs --branch-name ${AMP_BRANCH} --app-id ${AMP_APPID} --max-items 1 | jq -r '.jobSummaries[].status')
      case $JOBSTS in
        PENDING | PROVISIONING | RUNNING | CANCELLING)
          echo -e "    --  Job status: ${JOBSTS}, rechecking in ${_RCHK} seconds..."
          sleep $_RCHK
          _COUNT=$((_COUNT+1))
          ;;
        FAILED)
          echo -e "    -- Job status: ${JOBSTS} - AWS Amplify deployment job failed - Troubleshoot this deployment in AWS Amplify console, build ${AMP_BUILD_ID} - aborting workflow..."
          _COUNT=5000
          _BREAK=1
          ;;
        SUCCEED)
          echo -e "    -- Job status: ${JOBSTS} - AWS Amplify deployment job was successful"
          _COUNT=5000
          _BREAK=2
          ;;
        CANCELLED)
          echo -e "    -- Job status: ${JOBSTS} - AWS Amplify deployment job was cancelled, aborting workflow..."
          _COUNT=5000
          _BREAK=1
          ;;
        *)
          echo -e "[ERROR] An error occurred while checking job status of AWS Amplify build #${AMP_BUILD_ID}, aborting workflow..."
          _COUNT=5000
          _BREAK=1
          ;;
      esac
      [[ ${_BREAK} != 0 ]] && break
  done

  [[ "${_BREAK}" == 1 ]] && exit 1
}
# Main
main() {
  get_last_commit_id_in_prod_branch
  get_commit_id_of_current_amplify_deployment
  compare_commit_ids
  check_amplify_job_status
}

main
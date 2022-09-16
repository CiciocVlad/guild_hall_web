import { Project } from '../context';
import { apiServerUrl } from '../server';
import { refreshTokenSetup } from '../utils/token-setup';
import { makeRequest } from './makeRequest';

export const getEmployees = async (token: string | null) => {
  const { data } = await makeRequest({
    path: '/users',
    method: 'GET',
    token: token,
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

export const getEmployee = async (token: string | null, id?: string) => {
  const { data } = await makeRequest({
    path: `/users/${id}`,
    method: 'GET',
    token: token,
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

export const getOffToday = async (token: string | null, email?: string) => {
  const header = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email: email }),
  };
  const request = await fetch(`${apiServerUrl}/off-today`, header);
  return await request.json();
};

export const getRemainingDays = async (
  token: string | null,
  abortController?: AbortController
) => {
  const header = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: abortController?.signal,
  };
  const request = await fetch(`${apiServerUrl}/remaining-days`, header);
  return await request.json();
};

export const getRemainingDaysForUser = async (
  token: string | null,
  email: string,
  abortController?: AbortController
) => {
  const header = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: abortController?.signal,
  };
  const request = await fetch(
    `${apiServerUrl}/remaining-days/${email}`,
    header
  );
  return await request.json();
};

export const updatePTO = async (
  token: string | null,
  email: string,
  days: string
) => {
  const header = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, pto: { days } }),
  };
  const response = await fetch(`${apiServerUrl}/pto`, header);
  return { data: response.json(), status: response.status };
};

export const getTechnicalProfileData = async (
  token: string | null,
  mapping?: string
) => {
  const { data } = await makeRequest({
    path: `/profile/${mapping}`,
    method: 'GET',
    token: token,
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

export const createRedirectUrl = async (
  redirect_url: {},
  token: string | null
) => {
  const { data } = await makeRequest({
    path: '/redirect_urls',
    method: 'POST',
    body: { redirect_url: redirect_url },
    token: token,
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

const getLoginToken = async (token: string | null) => {
  const { data } = await makeRequest({
    path: `/authenticate_with_token`,
    method: 'POST',
    body: { id_token: token },
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

export const getUserProjectsDetails = async (
  token: string | null,
  id?: string
) => {
  const { data } = await makeRequest({
    path: `/users/${id}/projects_data`,
    method: 'GET',
    token: token,
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

export const getRoles = async (token: string | null, user_id?: string) => {
  const { data } = await makeRequest({
    path: `/users/${user_id}/roles`,
    method: 'GET',
    token,
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

export const getTechnologies = async (
  token: string | null,
  userId?: string
) => {
  const { data } = await makeRequest({
    path: `/users/${userId}/technologies`,
    method: 'GET',
    token,
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

export const getProjects = async (token: string | null) => {
  const { data } = await makeRequest({
    path: '/projects',
    method: 'GET',
    token,
    onError: ({ error }: { error: any }) => {
      console.log('Could not load projects', error);
    },
  });
  return data;
};

export const getUserProjects = async (
  token: string | null,
  user_id?: string
) => {
  const { data } = await makeRequest({
    path: `/users/${user_id}/projects`,
    method: 'GET',
    token,
    onError: ({ error }: { error: any }) =>
      console.log('Something went wrong', error),
  });
  return data;
};

export const createUserProject = async (
  token: string | null,
  user_id: string,
  project_id: string
) => {
  const { status } = await makeRequest({
    path: '/users_projects',
    method: 'POST',
    token,
    body: {
      user_project: {
        user_id,
        project_id,
      },
    },
    onError: ({ error }: { error: any }) =>
      console.log('Something went wrong', error),
  });
  return status;
};

export const deleteUserProject = async (token: string | null, id?: string) => {
  const { status } = await makeRequest({
    path: `/users_projects/${id}`,
    method: 'DELETE',
    token,
    onError: ({ error }: { error: any }) =>
      console.log('Something went wrong', error),
  });
  return status;
};

export const updateSkill = async (
  token: string | null,
  is_favorite: boolean,
  attribute_id?: string,
  user_id?: string
) => {
  const { data, status } = await makeRequest({
    path: '/attributes',
    method: 'PUT',
    body: {
      attribute_id,
      user_id,
      is_favorite,
    },
    token,
    onError: ({ error }: { error: any }) => {
      console.log('Could not update attribute', error);
    },
  });
  return { data, status };
};

export const createProject = async (token: string | null, project: Project) => {
  const { data, status } = await makeRequest({
    path: '/projects',
    method: 'POST',
    body: { project },
    token,
    onError: ({ error }: { error: any }) => {
      console.log('Could not create project', error);
    },
  });
  return { data, status };
};

export const updateProject = async (
  token: string | null,
  project_params: Project,
  id?: string | null
) => {
  const { data, status } = await makeRequest({
    path: `/projects/${id}`,
    method: 'PUT',
    body: { project: project_params },
    token,
    onError: ({ error }: { error: any }) => {
      console.log('Could not update project', error);
    },
  });
  return { data, status };
};

export const getFilters = async (token: string | null) => {
  const { data } = await makeRequest({
    path: '/filters',
    method: 'GET',
    token: token,
    onError: ({ error }: { error: any }) => {
      console.log('Something went wrong', error);
    },
  });
  return data;
};

export const onSuccess = async (
  res: any,
  setToken: any,
  setUser: any,
  setError: any
) => {
  const data = await getLoginToken(res.tokenObj.id_token);
  try {
    setToken(data.token);
    setUser(data.user);
  } catch (e) {
    setError(true);
  }
  refreshTokenSetup(res);
};

export const onFailure = () => {
  console.log('login failure');
};

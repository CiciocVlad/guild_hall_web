import { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  AlertColor,
  Box,
  Divider,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { mediumWidth, minWidth } from '../consts/consts';
import { TokenContext } from '../context';
import {
  createUserProject,
  deleteUserProject,
  getUserProjects,
} from '../network/requests';
import { CustomButton } from './CustomButton';
import { Loading } from './Loading';
import load from './Loading.module.css';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  start_date: string | null;
  end_date: string | null;
}

interface UserProject {
  id: string;
  project_id: string;
  user_id: string;
}

export const EditEmployeeProjects = ({ id }: { id: string | null }) => {
  const { palette } = useTheme();
  const { token } = useContext(TokenContext);
  const min = useMediaQuery(minWidth);
  const medium = useMediaQuery(mediumWidth);
  const [involvedInProjects, setInvolvedInProjects] = useState<Project[]>();
  const [notInvolvedInProjects, setNotInvolvedInProjects] =
    useState<Project[]>();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [alert, setAlert] = useState('');

  const involvedProjects = useRef(new Set<string>());
  const notInvolvedProjects = useRef(new Set<string>());
  const userProjects = useRef(new Map<string, string>());
  let statusCode = 200;

  useEffect(() => {
    (async () => {
      const { user_projects, other_projects } = await getUserProjects(
        token,
        id!
      );
      userProjects.current = user_projects.reduce(
        (
          acc: Map<string, string>,
          {
            project,
            user_project,
          }: { project: Project; user_project: UserProject }
        ) => {
          acc.set(project.id, user_project.id);
          return acc;
        },
        new Map<string, string>()
      );
      setInvolvedInProjects(
        user_projects.map(({ project }: { project: Project }) => project)
      );
      setNotInvolvedInProjects(other_projects);
      setLoading(false);
    })();
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleRemove = (project: Project) => {
    const userProjectId = userProjects.current.get(project.id);
    if (userProjectId)
      involvedProjects.current = new Set(involvedProjects.current).add(
        userProjectId
      );
    else {
      const notInvolved = new Set(notInvolvedProjects.current);
      notInvolved.delete(project.id);
      notInvolvedProjects.current = notInvolved;
    }
    setNotInvolvedInProjects(notInvolvedInProjects?.concat(project));
    setInvolvedInProjects(
      involvedInProjects?.filter((p: Project) => p.id !== project.id)
    );
  };

  const handleAdd = (project: Project) => {
    const userProjectId = userProjects.current.get(project.id);
    if (!userProjectId)
      notInvolvedProjects.current = new Set(notInvolvedProjects.current).add(
        project.id
      );
    else {
      const involved = new Set(involvedProjects.current);
      involved.delete(userProjectId);
      involvedProjects.current = involved;
    }
    setInvolvedInProjects(involvedInProjects?.concat(project));
    setNotInvolvedInProjects(
      notInvolvedInProjects?.filter((p: Project) => project.id !== p.id)
    );
  };

  return loading ? (
    <Box className={load.load}>
      <Loading color={palette.text.secondary} text="Loading..." />
    </Box>
  ) : (
    <Box sx={{ minHeight: '95vh' }}>
      <Snackbar
        open={open}
        autoHideDuration={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          sx={{
            '& .MuiAlert-icon': {
              fontSize: 25,
              color: 'var(--color-green300)',
            },
          }}
          severity={severity}
        >
          {alert}
        </Alert>
      </Snackbar>
      <Section
        title="Projects involved in"
        children={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
              padding: '1rem',
            }}
          >
            {involvedInProjects?.map((project: Project) => (
              <ProjectCard
                id={project.id}
                key={project.id}
                title={project.title}
                category={project.category}
                description={project.description}
                onClick={() => handleRemove(project)}
              />
            ))}
          </Box>
        }
      />
      <Section
        title="Projects not involved in"
        children={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
              padding: '1rem',
            }}
          >
            {notInvolvedInProjects?.map((project: Project) => (
              <ProjectCard
                id={project.id}
                key={project.id}
                title={project.title}
                category={project.category}
                description={project.description}
                onClick={() => handleAdd(project)}
              />
            ))}
          </Box>
        }
      />
      <Divider />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: min
            ? '0 1fr 1fr 0'
            : medium
            ? '0.3fr 1fr 1fr 0.3fr'
            : '2fr 1.5fr 1.5fr 2fr',
          justifyContent: 'center',
          padding: '1rem',
          gap: '1.5rem',
          backgroundColor: palette.general.frame,
        }}
      >
        <CustomButton
          text="Cancel"
          color={palette.project.cancel}
          fontColor={palette.primary.contrastText}
          start={2}
          onClick={() => window.location.replace('/employees')}
        />
        <CustomButton
          text="Update"
          color={palette.general.shareButton}
          fontColor={palette.secondary.contrastText}
          start={3}
          onClick={() => {
            involvedProjects.current.forEach((project_id: string) => {
              (async () => {
                const status = await deleteUserProject(token, project_id);
                statusCode = status;
              })();
            });
            notInvolvedProjects.current.forEach((project_id: string) => {
              (async () => {
                const status = await createUserProject(token, id!, project_id);
                statusCode = status;
              })();
            });
            if (statusCode === 200) {
              setSeverity('success');
              setAlert('Your projects were updated successfully');
            } else {
              setSeverity('error');
              setAlert('OOPS! there was an error updating projects');
            }
            setOpen(true);
          }}
        />
      </Box>
    </Box>
  );
};

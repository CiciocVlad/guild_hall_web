import { useContext, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { TokenContext } from '../context';
import { getProjects } from '../network/requests';
import { AddIconButton } from './AddIconButton';
import { AppBar } from './AppBar';
import { Content } from './Content';
import classes from './EmployeesPage.module.css';
import { LayoutContainer } from './LayoutContainer';
import { Loading } from './Loading';
import { ProjectCard } from './ProjectCard';
import { SearchBar } from './SearchBar';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const ProjectsPage = () => {
  const { palette } = useTheme();
  const { token } = useContext(TokenContext);
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getProjects(token);
      setProjects(data);
      setAllProjects(data);
      setLoading(false);
    })();
  }, []);

  const handleChange = (value: string) => {
    setProjects(
      allProjects.filter((project: Project) =>
        project.title.toLowerCase().includes(value.toLowerCase().trim())
      )
    );
  };

  return (
    <LayoutContainer>
      <AppBar />
      <Content>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <SearchBar handleChange={handleChange} />
          {loading ? (
            <Box className={classes.loadingContainer}>
              <Loading color={palette.text.secondary} text="Loading..." />
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%',
              }}
            >
              {projects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  description={project.description}
                />
              ))}
            </Box>
          )}
          <AddIconButton
            onClick={() => window.location.replace('/projects/edit')}
          />
        </Box>
      </Content>
    </LayoutContainer>
  );
};

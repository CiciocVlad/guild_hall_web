import { useContext, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { User } from '../context';
import { TokenContext } from '../context';
import { getCurrentDate } from '../helpers/dateHelpers';
import { getUserProjectsDetails } from '../network/requests';
import classes from './EmployeeProject.module.css';
import { Section } from './Section';
import { SectionSpinner } from './SectionSpinner';
import { UserProjectCard } from './UserProjectCard';

export const EmployeeProject = ({ employee }: { employee?: User }) => {
  const { palette } = useTheme();
  const { token } = useContext(TokenContext);
  const [usersProjects, setUsersProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getUserProjectsDetails(token, employee?.id);
      setUsersProjects(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Section
        title="Current projects"
        badges={['ONGOING']}
        children={
          <>
            {isLoading ? (
              <SectionSpinner color={palette.text.secondary} />
            ) : (
              <Box className={classes.container}>
                {usersProjects.map(
                  (
                    userProject: {
                      project: { title: string };
                      role: string;
                      end_date: string;
                      users: [];
                    },
                    index
                  ) => {
                    if (!userProject.end_date) {
                      return (
                        <UserProjectCard
                          key={index}
                          projectName={userProject.project.title}
                          role={userProject.role}
                          avatars={userProject.users}
                        />
                      );
                    }
                  }
                )}
              </Box>
            )}
          </>
        }
      />
      <Section
        title="Previous projects"
        children={
          <>
            {isLoading ? (
              <SectionSpinner color={palette.text.secondary} />
            ) : (
              <Box className={classes.container}>
                {usersProjects.map(
                  (
                    userProject: {
                      project: { title: string };
                      role: string;
                      end_date: string;
                      users: [];
                    },
                    index
                  ) => {
                    if (userProject.end_date < getCurrentDate()) {
                      return (
                        <UserProjectCard
                          key={index}
                          projectName={userProject.project.title}
                          role={userProject.role}
                          avatars={userProject.users}
                        />
                      );
                    }
                  }
                )}
              </Box>
            )}
          </>
        }
      />
    </>
  );
};

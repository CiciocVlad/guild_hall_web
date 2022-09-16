import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { maxWidth, maxWidthContent } from '../consts/consts';
import { TokenContext, User } from '../context';
import { getEmployee, getRoles, getTechnologies } from '../network/requests';
import { AppBar } from './AppBar';
import { Content } from './Content';
import { EmployeeOverview } from './EmployeeOverview';
import classes from './EmployeePage.module.css';
import { TimeOff } from './EmployeeTimeOff';
import { LayoutContainer } from './LayoutContainer';
import { Loading } from './Loading';
import { Tabs } from './TabContext';

export interface Skill {
  id: string;
  name: string;
  is_favorite: boolean;
}

export const EmployeePage = () => {
  const props_name = useLocation()?.state?.name;
  const { id } = useParams();
  const { token } = useContext(TokenContext);
  const [employee, setEmployee] = useState<User>();
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
  const media = useMediaQuery(maxWidth);
  const [timeOff, setTimeOff] = useState<TimeOff>();
  const [favoriteSkills, setFavoriteSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [department, setDepartment] = useState(undefined);

  const name = employee?.preferred_name || props_name;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getEmployee(token, id);
      setEmployee(data);
      const skills = await getTechnologies(token, data.id);
      if (skills) {
        setFavoriteSkills(
          skills.some((skill: Skill) => skill.is_favorite)
            ? skills.filter((skill: Skill) => skill.is_favorite)
            : skills.slice(0, 3)
        );
        setSkills(skills.filter((skill: Skill) => !skill.is_favorite));
      }
      const { department, roles } = await getRoles(token, id);
      setRoles(roles);
      setDepartment(department);
      setLoading(false);
    })();
  }, []);

  return (
    <LayoutContainer>
      <AppBar selectedUserId={id} name={name} />
      <Content>
        {loading ? (
          <Box className={classes.loadingContainer}>
            <Loading color={palette.text.secondary} text="Loading..." />
          </Box>
        ) : (
          <Box maxWidth={maxWidthContent} className={classes.container}>
            {!media && (
              <EmployeeOverview
                employee={employee}
                loading={loading}
                timeOff={timeOff}
                setTimeOff={setTimeOff}
                roles={roles}
                department={department}
                favoriteSkills={favoriteSkills}
              />
            )}
            <Tabs
              employee={employee}
              loading={loading}
              timeOff={timeOff}
              setTimeOff={setTimeOff}
              skills={skills}
              favoriteSkills={favoriteSkills}
              media={media}
            />
          </Box>
        )}
      </Content>
    </LayoutContainer>
  );
};

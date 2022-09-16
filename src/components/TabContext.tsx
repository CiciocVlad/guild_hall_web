import { useContext, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, useMediaQuery, useTheme, Tab } from '@mui/material';
import { largeWidth } from '../consts/consts';
import { User, UserContext } from '../context';
import { EmployeeActivity } from './EmployeeActivity';
import { EmployeeInfo } from './EmployeeInfos';
import { Skill } from './EmployeePage';
import { EmployeeProject } from './EmployeeProject';
import { EmployeeSkills } from './EmployeeSkills';
import { EmployeeTimeOff, TimeOff } from './EmployeeTimeOff';

enum Pages {
  ACTIVITY = 'activity',
  INFOS = 'infos',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  TIME_OFF = 'time off',
  OVERVIEW = 'overview',
}

export const Tabs = ({
  employee,
  loading,
  timeOff,
  setTimeOff,
  skills,
  favoriteSkills,
  media,
}: {
  employee?: User;
  loading?: boolean;
  timeOff?: TimeOff;
  setTimeOff: (timeOff: TimeOff) => void;
  skills: Skill[];
  favoriteSkills: Skill[];
  media: boolean;
}) => {
  const isTabletView = useMediaQuery(largeWidth);
  const { palette } = useTheme();
  const { user } = useContext(UserContext);
  const headers = [Pages.SKILLS, Pages.PROJECTS, Pages.ACTIVITY];

  if (media) headers.unshift(Pages.OVERVIEW);
  else headers.unshift(Pages.INFOS);

  const [value, setValue] = useState(headers[0]);

  if (employee?.id == user?.id) headers.push(Pages.TIME_OFF);

  const pages = new Map<Pages, any>([
    [Pages.ACTIVITY, <EmployeeActivity employee={employee} />],
    [
      Pages.INFOS,
      <EmployeeInfo
        employee={employee}
        loading={loading}
        setTimeOff={setTimeOff}
      />,
    ],
    [
      Pages.SKILLS,
      <EmployeeSkills favoriteSkills={favoriteSkills} skills={skills} />,
    ],
    [Pages.PROJECTS, <EmployeeProject employee={employee} />],
    [Pages.TIME_OFF, <EmployeeTimeOff timeOff={timeOff} />],
    [
      Pages.OVERVIEW,
      <EmployeeInfo
        employee={employee}
        loading={loading}
        timeOff={timeOff}
        setTimeOff={setTimeOff}
      />,
    ],
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: Pages) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: media ? '100%' : 'auto',
        flex: '60%',
        typography: 'body1',
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            height: '2.65rem',
            marginTop: media ? 0 : '3.125rem',
            backgroundColor: palette.general.frame,
            opacity: '60%',
            borderRadius: '0.625rem 0.625rem 0 0',
            color: palette.text.secondary,
          }}
        >
          <TabList
            centered={isTabletView}
            onChange={handleChange}
            aria-label="tabs"
            variant={isTabletView ? 'standard' : 'scrollable'}
            indicatorColor="secondary"
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                top: '2.65rem',
              },
            }}
          >
            {headers.map((header: Pages) => (
              <Tab
                key={header}
                label={header}
                value={header}
                disabled={
                  loading ||
                  (header === Pages.TIME_OFF && !!employee?.left_date)
                }
                sx={{
                  opacity: value === header ? '100%' : '60%',
                  typography: 'body2',
                }}
              />
            ))}
          </TabList>
        </Box>
        {headers.map((header: Pages) => (
          <TabPanel key={header} value={header} sx={{ padding: 0 }}>
            {pages.get(header)}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

import { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, useMediaQuery, useTheme } from '@mui/material';
import { maxWidth, mediumWidthContent } from '../consts/consts';
import { AppBar } from './AppBar';
import { Content } from './Content';
import { EditEmployeeInfos } from './EditEmployeeInfos';
import { EditEmployeeProjects } from './EditEmployeeProjects';
import { EditEmployeeSkills } from './EditEmployeeSkills';
import { EditEmployeeTimeOff } from './EditEmployeeTimeOff';
import classes from './EmployeePage.module.css';
import { LayoutContainer } from './LayoutContainer';

enum Pages {
  INFOS = 'infos',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  TIME_OFF = 'time off',
}

export const EditEmployee = () => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [preferredName, setPreferredName] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [hobbies, setHobbies] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(Pages.INFOS);
  const { palette } = useTheme();
  const media = useMediaQuery(maxWidth);

  useEffect(() => {
    setId(window.sessionStorage.getItem('id'));
    setName(window.sessionStorage.getItem('name'));
    setPreferredName(window.sessionStorage.getItem('preferredName'));
    setBio(window.sessionStorage.getItem('bio'));
    setPhone(window.sessionStorage.getItem('phone'));
    setEmail(window.sessionStorage.getItem('email'));
    setHobbies(window.sessionStorage.getItem('hobbies'));
    setStartDate(window.sessionStorage.getItem('startDate'));
  }, []);

  useEffect(() => {
    setEdit(JSON.parse(window.sessionStorage.getItem('edit')!));
    setDisabled(!edit);
  }, [edit]);

  const handleChange = (event: React.SyntheticEvent, newValue: Pages) =>
    setValue(newValue);

  const headers = [Pages.INFOS, Pages.SKILLS, Pages.PROJECTS, Pages.TIME_OFF];

  const pages = new Map<Pages, JSX.Element>([
    [
      Pages.INFOS,
      <EditEmployeeInfos
        name={name}
        setName={setName}
        prefferedName={preferredName}
        setPrefferedName={setPreferredName}
        bio={bio}
        setBio={setBio}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        hobbies={hobbies}
        startDate={startDate}
        setStartDate={setStartDate}
        disabled={disabled}
        setDisabled={setDisabled}
      />,
    ],
    [Pages.SKILLS, <EditEmployeeSkills id={id} />],
    [Pages.PROJECTS, <EditEmployeeProjects id={id} />],
    [Pages.TIME_OFF, <EditEmployeeTimeOff email={email} />],
  ]);

  return (
    <LayoutContainer>
      <AppBar employee={name} />
      <Content>
        <Box maxWidth={mediumWidthContent} className={classes.container}>
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
                  opacity: 0.6,
                  borderRadius: '0.625rem 0.625rem 0 0',
                  color: palette.text.secondary,
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="tabs"
                  variant="scrollable"
                  indicatorColor="secondary"
                  textColor="inherit"
                  TabIndicatorProps={{ style: { top: '2.65rem' } }}
                >
                  {headers.map((header: Pages) => (
                    <Tab
                      key={header}
                      label={header}
                      value={header}
                      disabled={header !== Pages.INFOS && !edit}
                      sx={{
                        opacity: value === header ? 1 : 0.6,
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
        </Box>
      </Content>
    </LayoutContainer>
  );
};

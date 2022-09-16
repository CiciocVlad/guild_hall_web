import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { maxWidth } from '../consts/consts';
import { User } from '../context';
import classes from './EmployeeInfos.module.css';
import { TimeOff } from './EmployeeTimeOff';
import { Section } from './Section';
import { StatusBar } from './StatusBar';

export const EmployeeInfo = ({
  employee,
  loading,
  timeOff,
  setTimeOff,
}: {
  employee?: User;
  loading?: boolean;
  timeOff?: TimeOff;
  setTimeOff: (timeOff: TimeOff) => void;
}) => {
  const media = useMediaQuery(maxWidth);
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: palette.general.text,
      }}
    >
      {media && (
        <StatusBar
          employee={employee}
          loading={loading}
          timeOff={timeOff}
          setTimeOff={setTimeOff}
        />
      )}
      <Section
        title={'Name'}
        children={
          <Box
            className={classes.section_content}
            sx={{
              display: media ? 'block' : 'flex',
            }}
          >
            <Box className={classes.section_content_first}>
              <Typography className={classes.subtitle}>
                First and Last Name
              </Typography>
              <Typography variant="body1" className={classes.content}>
                {employee?.name}
              </Typography>
            </Box>
            <Box className={classes.section_content_second}>
              <Typography className={classes.subtitle}>
                Preferred Name
              </Typography>
              <Typography variant="body1" className={classes.content}>
                {employee?.preferred_name}
              </Typography>
            </Box>
          </Box>
        }
      />
      <Section
        title={'Bio'}
        children={
          <Box className={classes.section_content}>
            <Box>
              <Typography variant="body1" className={classes.content}>
                {employee?.bio}
              </Typography>
            </Box>
          </Box>
        }
      />
      <Section
        title={'Contact'}
        children={
          <Box
            className={classes.section_content}
            sx={{
              display: media ? 'block' : 'flex',
            }}
          >
            <Box className={classes.section_content_first}>
              <Typography className={classes.subtitle}>Phone number</Typography>
              <Typography variant="body1" className={classes.content}>
                {employee?.phone}
              </Typography>
            </Box>
            <Box className={classes.section_content_second}>
              <Typography className={classes.subtitle}>Email adress</Typography>
              <Typography variant="body1" className={classes.content}>
                {employee?.email}
              </Typography>
            </Box>
          </Box>
        }
      />
      <Section
        title={'Hobbies'}
        children={
          <Box className={classes.section_content}>
            {employee?.hobbies && employee?.hobbies?.length > 0 && (
              <Typography variant="body1" className={classes.content}>
                {employee?.hobbies?.join(', ')}
              </Typography>
            )}
          </Box>
        }
      />
      <Section
        title={'Years of wisdom'}
        children={
          <Box className={classes.section_content}>
            <Typography variant="body1" className={classes.content}>
              {employee?.joined_date}
            </Typography>
          </Box>
        }
      />
    </Box>
  );
};

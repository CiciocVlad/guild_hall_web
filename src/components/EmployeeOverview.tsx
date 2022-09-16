import { useMediaQuery } from '@mui/material';
import { Box, Chip, Typography, useTheme } from '@mui/material';
import { maxWidth } from '../consts/consts';
import { User } from '../context';
import classes from './EmployeeOverview.module.css';
import { Skill } from './EmployeePage';
import { TimeOff } from './EmployeeTimeOff';
import { SkillComponent } from './SkillComponent';
import { StatusBar } from './StatusBar';

export const EmployeeOverview = ({
  employee,
  loading,
  timeOff,
  setTimeOff,
  favoriteSkills,
  roles,
  department,
}: {
  employee?: User;
  loading: boolean;
  timeOff?: TimeOff;
  setTimeOff: (timeOff: TimeOff) => void;
  favoriteSkills?: Skill[];
  roles?: string[];
  department?: string;
}) => {
  const { palette } = useTheme();
  const media = useMediaQuery(maxWidth);

  return (
    <Box sx={{ display: 'flex', flex: '40%' }}>
      <Box className={classes.wrapper} sx={{ minHeight: '95vh' }}>
        <StatusBar
          employee={employee}
          loading={loading}
          timeOff={timeOff}
          setTimeOff={setTimeOff}
        />
        <Box
          sx={{
            backgroundColor: media ? palette.secondary.dark : 'transparent',
          }}
          className={classes.container}
        >
          <Typography
            variant="subtitle1"
            className={classes.subtitle}
            sx={{
              marginTop: '3.896em',
              color: palette.text.secondary,
            }}
          >
            Position
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {department && (
              <Chip
                label={department}
                className={classes.chip}
                sx={{
                  color: palette.primary.contrastText,
                  backgroundColor: palette.primary.light,
                }}
              />
            )}
            {roles?.map((role) => (
              <Chip
                key={role}
                label={role}
                className={classes.chip}
                sx={{
                  color: palette.primary.contrastText,
                  backgroundColor: palette.primary.light,
                }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: media ? palette.secondary.dark : 'transparent',
          }}
          className={classes.container}
        >
          <Typography
            variant="subtitle1"
            className={classes.subtitle}
            sx={{
              marginTop: '2.4em',
              color: palette.text.secondary,
            }}
          >
            Masteries
          </Typography>
          <div className={classes.skills_container}>
            {favoriteSkills?.map((skill: Skill) => (
              <SkillComponent skill={skill} key={skill.id} />
            ))}
          </div>
        </Box>
        <Box
          sx={{
            backgroundColor: media ? palette.secondary.dark : 'transparent',
          }}
          className={classes.container}
        >
          <Typography
            variant="subtitle1"
            className={classes.subtitle}
            sx={{
              marginTop: '1.8em',
              color: palette.text.secondary,
            }}
          >
            On web
          </Typography>
          <div className={classes.social_media_container}>
            <Box sx={{ display: 'flex', gap: '1.375em' }}>
              {employee?.social_media &&
                Object.keys(employee?.social_media)?.map((s: string) => (
                  <a
                    href={employee?.social_media[s]}
                    key={employee?.social_media[s]}
                  >
                    <img
                      src={`../../assets/svg/social_media/${palette.mode}/${s}.svg`}
                    />
                  </a>
                ))}
            </Box>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

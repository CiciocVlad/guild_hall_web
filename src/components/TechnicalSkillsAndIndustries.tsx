import { Box, Chip, Typography } from '@mui/material';
import classes from './TechnicalProfilePage.module.css';

export const TechnicalSkillsAndIndustries = ({
  industries,
  skills,
}: {
  industries?: string[];
  skills?: string[];
}) => (
  <Box>
    <Box className={classes.about_container}>
      <Typography className={classes.about_text}>
        <span
          className={`${classes.angle_brackets} ${classes.angle_brackets_skills}`}
        >
          {'>>> '}
        </span>
        <span className={classes.industries_skills_brackets}>{'</'}</span>
        Industries
        <span className={classes.industries_skills_brackets}>{'>'}</span>
      </Typography>
      <Box className={classes.industries_chip_container}>
        {industries?.map((i: string) => (
          <Chip
            key={i}
            className={`${classes.industries_chip} ${classes.industries_skills_chip}`}
            label={i}
          />
        ))}
      </Box>
    </Box>
    <Box className={`${classes.about_container} ${classes.skills_container}`}>
      <Typography
        className={`${classes.about_text} ${classes.skills_text}`}
        sx={{ textAlign: 'right' }}
      >
        <span
          className={`${classes.angle_brackets} ${classes.angle_brackets_skills}`}
        >
          {'>>> '}
        </span>
        <span className={classes.industries_skills_brackets}>{'</'}</span>
        Skills
        <span className={classes.industries_skills_brackets}>{'>'}</span>
      </Typography>
      <Box
        className={`${classes.industries_chip_container} ${classes.skills_chip_container}`}
      >
        {skills?.map((skill: string) => (
          <Chip
            key={skill}
            className={`${classes.skills_chip} ${classes.industries_skills_chip}`}
            label={skill}
          />
        ))}
      </Box>
    </Box>
  </Box>
);

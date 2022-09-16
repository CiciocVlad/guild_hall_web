import { Box, Chip, Typography } from '@mui/material';
import { darkPalette } from '../theme';
import classes from './TechnicalSkills.module.css';

const leftArrows = (title: String) => (
  <Typography
    variant="h4"
    sx={{
      color: darkPalette.text.secondary,
      fontSize: '2.5rem',
    }}
  >
    <span
      className={`${classes.angle_brackets} ${classes.angle_brackets_skills}`}
      style={{ fontWeight: 300 }}
    >
      {'>>> '}
    </span>
    <span
      className={classes.industries_skills_brackets}
      style={{ fontWeight: 300 }}
    >
      {'</'}
    </span>
    {title}
    <span
      className={classes.industries_skills_brackets}
      style={{ fontWeight: 300 }}
    >
      {'>'}
    </span>
  </Typography>
);

export const leftSide = (title: string) => (
  <Box className={classes.left}>{leftArrows(title)}</Box>
);

export const rightSide = (attr?: string[]) => (
  <Box className={classes.right}>
    {attr?.map((skill: string) => (
      <Chip
        key={skill}
        className={`${classes.skills_chip} ${classes.industries_skills_chip}`}
        label={skill}
      />
    ))}
  </Box>
);

export const TechnicalSkills = ({ skills }: { skills?: string[] }) => (
  <Box className={classes.container}>
    {leftSide('Skills')}
    {rightSide(skills)}
  </Box>
);

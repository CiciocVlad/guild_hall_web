import { Box } from '@mui/material';
import { leftSide, rightSide } from './TechnicalSkills';
import classes from './TechnicalSkills.module.css';

export const TechnicalIndustries = ({
  industries,
}: {
  industries?: string[];
}) => (
  <Box className={classes.container}>
    {leftSide('Industries')}
    {rightSide(industries)}
  </Box>
);

import { Box, Typography, useTheme } from '@mui/material';
import classes from './PastDaysCard.module.css';

export const PastDaysCard = ({
  year,
  days,
}: {
  year: number;
  days: number;
}) => {
  const { palette } = useTheme();

  return (
    <Box
      className={classes.wrapper}
      sx={{ backgroundColor: palette.time_off.time_off_background }}
    >
      <Box sx={{ display: 'flex', gap: '0.875rem' }}>
        <Typography
          variant="h2"
          sx={{ color: palette.time_off.font }}
        >{`Days off ${year}`}</Typography>
        <Typography
          variant="h2"
          sx={{ color: palette.primary.contrastText }}
        >{`${days} days`}</Typography>
      </Box>
    </Box>
  );
};

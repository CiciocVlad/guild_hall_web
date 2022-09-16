import { Box, Typography, useTheme } from '@mui/material';
import classes from './TimeOffCard.module.css';

export const TimeOffCard = (props: any) => {
  const { palette } = useTheme();
  return (
    <Box
      className={classes.container}
      sx={{
        ...(props.title === 'Remaining days'
          ? {
              backgroundColor: palette.secondary.main,
              color: palette.secondary.contrastText,
            }
          : {
              backgroundColor: palette.time_off.time_off_background,
              color: palette.time_off.font,
            }),
        display: props?.display,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1em',
          textAlign: 'center',
          width: '4.3em',
          marginLeft: '0.5em',
        }}
      >
        {props.title}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '-20px',
          fontSize: '2rem',
        }}
      >
        {props.days}
      </Typography>
    </Box>
  );
};

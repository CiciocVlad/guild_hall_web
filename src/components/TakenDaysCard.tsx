import { Box, Typography, useTheme } from '@mui/material';
import classes from './TakenDaysCard.module.css';

export const TakenDaysCard = (props: any) => {
  const { palette } = useTheme();
  function getMonthName(month: any) {
    const d = new Date();
    d.setMonth(month - 1);
    const monthName = d.toLocaleString('en-us', { month: 'short' });
    return monthName;
  }
  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    const formatedDate = `${getMonthName(month)}, ${day} ${year}`;

    return formatedDate;
  };

  return (
    <Box
      className={classes.container}
      sx={{
        backgroundColor: palette.time_off.taken_days_background,
        color: palette.text.secondary,
        marginRight: '1em',
        marginTop: '0.5em',
      }}
    >
      <Typography variant="h2" sx={{ padding: '1.375em' }}>
        Dates selected: {formatDate(props.first_day)} -
        {formatDate(props.last_day)}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          marginLeft: '1.375em',
          marginTop: '-1em',
        }}
      >
        Number of days planned: {props.days}
      </Typography>
    </Box>
  );
};

import { Box } from '@mui/material';
import { Days } from './EditEmployeeTimeOff';
import { PastDaysCard } from './PastDaysCard';
import { Section } from './Section';
import classes from './TimeOffPastYears.module.css';

export const TimeOffPastYears = ({ events }: { events?: Days[] }) => {
  return (
    <Section
      title="Time off past years"
      children={
        <Box className={classes.container}>
          {events?.map(({ days, year }) => (
            <PastDaysCard key={year} days={days} year={year} />
          ))}
        </Box>
      }
    />
  );
};

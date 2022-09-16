import { Box } from '@mui/material';
import classes from './EmployeeTimeOff.module.css';
import { Section } from './Section';
import { TakenDaysCard } from './TakenDaysCard';
import { TimeOffCard } from './TimeOffCard';

interface Event {
  start: string;
  end: string;
  number_of_days: number;
}

export interface TimeOff {
  days_extra: number;
  days_off: number;
  remaining_days: number;
  taken_days: number;
  events: Event[];
}

export const EmployeeTimeOff = ({ timeOff }: { timeOff?: TimeOff }) => {
  const today = new Date();

  return (
    <Box>
      <Section
        title={'Time off'}
        children={
          <Box
            className={classes.container_time_off}
            sx={{
              paddingBottom: '0.625em',
              display: 'grid',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <TimeOffCard
              title={`Days off ${today.getFullYear()}`}
              days={timeOff?.days_off}
            />
            <TimeOffCard title="Days extra" days={timeOff?.days_extra} />
            <TimeOffCard title="Taken days" days={timeOff?.taken_days} />
            <TimeOffCard
              title="Remaining days"
              days={timeOff?.remaining_days}
            />
          </Box>
        }
      />
      <Section
        title={'Taken days'}
        children={
          <Box
            className={classes.container_taken_days}
            sx={{
              paddingBottom: '0.625em',
              marginLeft: '0.625em',
              justifyContent: 'center',
            }}
          >
            {timeOff?.events?.map((event: Event) => (
              <TakenDaysCard
                key={event.start}
                first_day={event.start}
                last_day={event.end}
                days={event.number_of_days}
              />
            ))}
          </Box>
        }
      />
    </Box>
  );
};

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { Event } from './EditEmployeeTimeOff';
import { TakenDaysCard } from './TakenDaysCard';
import classes from './TimeOffEvents.module.css';

export const TimeOffEvents = ({
  title,
  events,
}: {
  title: string;
  events?: Event[];
}) => {
  const { palette } = useTheme();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1" sx={{ color: palette.general.text }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box className={classes.wrapper}>
          {events?.map((event) => (
            <TakenDaysCard
              key={event.start}
              first_day={event.start}
              last_day={event.end}
              days={event.number_of_days}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

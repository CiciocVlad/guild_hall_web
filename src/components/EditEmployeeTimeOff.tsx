import { useContext, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { mediumWidthContent } from '../consts/consts';
import { TokenContext } from '../context';
import { getRemainingDaysForUser } from '../network/requests';
import { Loading } from './Loading';
import load from './Loading.module.css';
import { TimeOffCurrentYear } from './TimeOffCurrentYear';
import { TimeOffEvents } from './TimeOffEvents';
import { TimeOffPastYears } from './TimeOffPastYears';

export interface Event {
  start: string;
  end: string;
  number_of_days: number;
}

export interface Days {
  days: number;
  year: number;
}

interface TimeOff {
  days_extra: number;
  days_off: number;
  events: Event[];
  add_days: Event[];
  bonus_days: Event[];
  past_days: Days[];
  remaining_days: number;
  taken_days: number;
}

export const EditEmployeeTimeOff = ({ email }: { email: string | null }) => {
  const { token } = useContext(TokenContext);
  const { palette } = useTheme();
  const [timeOff, setTimeOff] = useState<TimeOff>();
  const [loading, setLoading] = useState(true);

  const abortController = new AbortController();

  useEffect(() => {
    (async () => {
      try {
        const data = await getRemainingDaysForUser(
          token,
          email!,
          abortController
        );
        setTimeOff(data);
      } catch (e: any) {
        if (!abortController.signal.aborted) return { error: e.message };
      }
      setLoading(false);
    })();

    return () => abortController.abort();
  }, [loading]);

  return loading ? (
    <Box className={load.load}>
      <Loading color={palette.text.secondary} text="Loading..." />
    </Box>
  ) : (
    <Box sx={{ minHeight: '95vh', maxWidth: mediumWidthContent }}>
      <TimeOffPastYears events={timeOff?.past_days} />
      <TimeOffCurrentYear timeOff={timeOff} email={email} />
      <TimeOffEvents title="Taken days" events={timeOff?.events} />
      <TimeOffEvents title="Add days" events={timeOff?.add_days} />
      <TimeOffEvents title="Bonus days" events={timeOff?.bonus_days} />
    </Box>
  );
};

import { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { TokenContext, User, UserContext } from '../context';
import { getOffToday, getRemainingDays } from '../network/requests';
import { TimeOff } from './EmployeeTimeOff';
import { Loading } from './Loading';
import classes from './StatusBar.module.css';

interface OffToday {
  off_today: boolean;
  start: string;
  end: string;
}

export const StatusBar = ({
  employee,
  loading,
  timeOff,
  setTimeOff,
}: {
  employee?: User;
  loading?: boolean;
  timeOff?: TimeOff;
  setTimeOff: (timeOff: TimeOff) => void;
}) => {
  const { user } = useContext(UserContext);
  const { palette } = useTheme();
  const { token } = useContext(TokenContext);
  const isMyProfile = user?.id === employee?.id;
  const [offToday, setOffToday] = useState<OffToday>();
  const [loadingOff, setLoadingOff] = useState(true);

  const formatDate = (date: string, includeYear: boolean = true) => {
    const [year, month, day] = date.split('-');
    const formatedDate = `${day}.${month}`;
    return includeYear ? formatedDate + `.${year}` : formatedDate;
  };

  const abortController = new AbortController();

  useEffect(() => {
    (async () => {
      if (timeOff) setLoadingOff(false);
      if (isMyProfile && !timeOff) {
        if (!employee?.left_date) {
          try {
            const data = await getRemainingDays(token, abortController);
            setTimeOff(data);
          } catch (e: any) {
            if (!abortController.signal.aborted) return { error: e.message };
          }
        }
        setLoadingOff(false);
      } else {
        if (!loading) {
          if (employee && !employee?.left_date) {
            const data = await getOffToday(token, employee?.email);
            setOffToday(data);
          }
          setLoadingOff(false);
        }
      }
    })();
    return () => abortController.abort();
  }, [loading]);

  return (
    <Box
      sx={{
        backgroundColor:
          isMyProfile || loadingOff
            ? palette.status.background
            : offToday?.off_today
            ? palette.status.offline
            : palette.status.online,
      }}
      className={classes.avatar_container}
    >
      <Avatar className={classes.avatar} src={employee?.avatar} />
      <Box
        sx={{
          marginLeft:
            (isMyProfile || offToday?.off_today) && !employee!.left_date
              ? '1.25em'
              : '2.5em',
          color: palette.text.secondary,
        }}
        className={classes.avatar_wrapper}
      >
        {loadingOff ? (
          <Loading color={palette.text.secondary} text={'Loading...'} />
        ) : employee!.left_date ? (
          <Typography variant="h3">Left</Typography>
        ) : isMyProfile ? (
          <Typography variant="body1">Remaining days</Typography>
        ) : (
          <Typography sx={{ color: palette.status.text }} variant="h3">
            {offToday?.off_today ? 'ON HOLIDAY' : 'AT WORK'}
          </Typography>
        )}
        {employee?.left_date ? null : isMyProfile ? (
          <Typography sx={{ color: palette.text.secondary }} variant="h1">
            {timeOff?.remaining_days}
          </Typography>
        ) : (
          offToday?.off_today && (
            <Typography
              sx={{ color: palette.status.text }}
              variant="body2"
            >{`${formatDate(offToday.start, false)} - ${formatDate(
              offToday.end
            )}`}</Typography>
          )
        )}
      </Box>
    </Box>
  );
};

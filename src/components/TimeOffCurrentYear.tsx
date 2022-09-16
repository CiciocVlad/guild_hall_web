import React, { useContext, useEffect, useState } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import {
  Alert,
  AlertColor,
  Box,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { mediumWidth, minWidth } from '../consts/consts';
import { TokenContext } from '../context';
import { updatePTO } from '../network/requests';
import { CustomButton } from './CustomButton';
import { EditTimeOffCard } from './EditTimeOffCard';
import { TimeOff } from './EmployeeTimeOff';
import { Section } from './Section';
import { TimeOffCard } from './TimeOffCard';
import classes from './TimeOffCurrentYear.module.css';

export const TimeOffCurrentYear = ({
  timeOff,
  email,
}: {
  timeOff?: TimeOff;
  email: string | null;
}) => {
  const { palette } = useTheme();
  const { token } = useContext(TokenContext);
  const medium = useMediaQuery(mediumWidth);
  const min = useMediaQuery(minWidth);
  const [display, setDisplay] = useState('none');
  const [days, setDays] = useState<string | null>();
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [alert, setAlert] = useState('');
  const [open, setOpen] = useState(false);
  const today = new Date();

  useEffect(() => {
    setDays(timeOff?.days_off.toString());
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Section
      title="Time off current year"
      children={
        <Box className={classes.container}>
          <Snackbar
            open={open}
            autoHideDuration={null}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              sx={{
                '& .MuiAlert-icon': {
                  fontSize: 25,
                  color: 'var(--color-green300)',
                },
              }}
              severity={severity}
            >
              {alert}
            </Alert>
          </Snackbar>
          <EditTimeOffCard
            title={`Days off ${today.getFullYear()}`}
            value={days}
            setValue={setDays}
            display={display}
          />
          <TimeOffCard
            title={`Days off ${today.getFullYear()}`}
            days={timeOff?.days_off}
            display={display === 'none' ? 'block' : 'none'}
          />
          <TimeOffCard title="Days extra" days={timeOff?.days_extra} />
          <TimeOffCard title="Taken days" days={timeOff?.taken_days} />
          <TimeOffCard title="Remaining days" days={timeOff?.remaining_days} />
          <Box
            className={classes.button_wrapper}
            sx={{
              display,
              gridTemplateColumns: min
                ? '0 1fr 1fr 0'
                : medium
                ? '0.3fr 1fr 1fr 0.3fr'
                : '2fr 1.5fr 1.5fr 2fr',
            }}
          >
            <CustomButton
              text="Cancel"
              color={palette.project.cancel}
              fontColor={palette.primary.contrastText}
              start={2}
              onClick={() => window.location.replace('/employees')}
            />
            <CustomButton
              text="Update"
              color={palette.general.shareButton}
              fontColor={palette.secondary.contrastText}
              start={3}
              onClick={() => {
                (async () => {
                  const { status } = await updatePTO(token, email!, days!);
                  if (status === 200) {
                    setSeverity('success');
                    setAlert('Time off updated successfully');
                  } else {
                    setSeverity('error');
                    setAlert('OOPS! there was an error updating time off');
                  }
                  setOpen(true);
                })();
              }}
            />
          </Box>
          <IconButton
            className={classes.edit_icon}
            onClick={() => setDisplay('grid')}
          >
            <ModeEditOutlineIcon
              sx={{
                color: palette.project.edit,
                fontSize: '1.8rem',
                '&:hover': {
                  color: palette.text.primary,
                },
              }}
            />
          </IconButton>
        </Box>
      }
    />
  );
};

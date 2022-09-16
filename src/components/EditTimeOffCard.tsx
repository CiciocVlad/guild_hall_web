import { Box, Input, Typography, useTheme } from '@mui/material';
import classes from './TimeOffCard.module.css';

export const EditTimeOffCard = ({
  title,
  value,
  setValue,
  display,
}: {
  title: string;
  value?: string | null;
  setValue: (value?: string | null) => void;
  display?: string;
}) => {
  const { palette } = useTheme();
  return (
    <Box
      className={classes.container}
      sx={{
        ...(title === 'Remaining days'
          ? {
              backgroundColor: palette.secondary.main,
              color: palette.secondary.contrastText,
            }
          : {
              backgroundColor: palette.time_off.time_off_background,
              color: palette.time_off.font,
            }),
        display,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1em',
          textAlign: 'center',
          widht: '4.3em',
          marginLeft: '0.5em',
        }}
      >
        {title}
      </Typography>
      <Input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '-20px',
          fontSize: '2rem',
          input: { textAlign: 'center' },
          '&::before': {
            border: 'none',
          },
        }}
      />
    </Box>
  );
};

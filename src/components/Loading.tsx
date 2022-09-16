import { Box, CircularProgress, Typography } from '@mui/material';
import classes from './Loading.module.css';

interface LoadingOverlayProps {
  color: string;
  text?: string;
}

export const Loading = (props: LoadingOverlayProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.62rem',
    }}
  >
    <CircularProgress className={classes.loading} sx={{ color: props.color }} />
    <Typography variant="body1" sx={{ color: props.color }}>
      {props.text}
    </Typography>
  </Box>
);

import { Box } from '@mui/material';
import { Loading } from './Loading';

export const SectionSpinner = ({ color }: { color: string }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Loading color={color} text={'Loading...'} />
  </Box>
);

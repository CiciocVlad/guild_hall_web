import { Box, Typography, useTheme } from '@mui/material';

export const DisplayString = ({
  title,
  value,
}: {
  title: string;
  value?: string | null;
}) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: palette.general.frame,
        marginTop: '1.25rem',
        width: '100%',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: palette.text.secondary,
          fontSize: '1.25rem',
          margin: '1rem',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', margin: '0 1rem 1rem 1rem', flexGrow: 1 }}>
        <Typography
          variant="h3"
          sx={{ color: palette.text.secondary, marginLeft: '1rem' }}
        >
          {value !== 'null' && value !== null ? value : ''}
        </Typography>
      </Box>
    </Box>
  );
};

import { ReactNode } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { maxWidth } from '../consts/consts';

export const LayoutContainer = ({
  children,
}: {
  children: Array<ReactNode>;
}) => {
  const { palette } = useTheme();
  const media = useMediaQuery(maxWidth);

  return (
    <Box
      display={media ? 'block' : 'flex'}
      position="relative"
      minHeight="100%"
      margin="auto"
      bgcolor={palette.background.paper}
      overflow="clip"
    >
      {children}
    </Box>
  );
};

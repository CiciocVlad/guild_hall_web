import { ReactNode } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import {
  maxWidth,
  appBarHeight,
  appBarHeightMobile,
  gutter,
} from '../consts/consts';

export const Content = ({ children }: { children: ReactNode }) => {
  const media = useMediaQuery(maxWidth);

  return (
    <Box
      display={media ? 'block' : 'flex'}
      flexGrow="1"
      paddingTop={media ? appBarHeightMobile : appBarHeight}
      paddingBottom={gutter}
    >
      {children}
    </Box>
  );
};

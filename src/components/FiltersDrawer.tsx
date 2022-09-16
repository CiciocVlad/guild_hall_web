import { ReactNode } from 'react';
import {
  Box,
  Drawer,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { maxWidth } from '../consts/consts';
import classes from './FiltersSection.module.css';

export const FiltersDrawer = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: Array<ReactNode>;
}) => {
  const { palette } = useTheme();

  const background =
    palette.mode === 'dark'
      ? 'linear-gradient(0deg, rgba(91, 63, 121, 0.15), rgba(91, 63, 121, 0.15)), #121212'
      : palette.background.default;

  const media = useMediaQuery(maxWidth);

  if (media) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        onOpen={() => {}}
      >
        <Box className={classes.drawer} sx={{ background: background }}>
          <Box
            className={classes.puller}
            sx={{
              width: '2rem',
              height: '0.25rem',
              borderRadius: 3,
              position: 'absolute',
              top: '1rem',
              left: 'calc(50% - 1rem)',
              opacity: 0.87,
              backgroundColor: palette.filters.puller,
            }}
          />
          {children}
        </Box>
      </SwipeableDrawer>
    );
  }

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <Box className={classes.drawer} sx={{ background: background }}>
        {children}
      </Box>
    </Drawer>
  );
};

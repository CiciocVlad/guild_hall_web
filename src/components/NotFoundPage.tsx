import { useTheme } from '@mui/material';
import { Box } from '@mui/material';
import notFoundBackgroundImageDark from '../../assets/svg/not_found/dark/not-found-background.svg';
import notFoundBackgroundImageLight from '../../assets/svg/not_found/light/not-found-background.svg';
import classes from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const { palette } = useTheme();

  let backgroundImage = notFoundBackgroundImageLight;
  if (palette.mode == 'dark') {
    backgroundImage = notFoundBackgroundImageDark;
  }

  return (
    <Box
      className={classes.container}
      sx={{
        backgroundColor: palette.background.paper,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Box className={classes.content_container}>
        <Box
          component="span"
          className={classes.title}
          color={palette.text.primary}
        >
          404
        </Box>
        <Box
          component="span"
          className={classes.message}
          color={palette.text.primary}
        >
          Congratulations, you found the very <br />
          rare path that leads to nowhere!
        </Box>
      </Box>
    </Box>
  );
};

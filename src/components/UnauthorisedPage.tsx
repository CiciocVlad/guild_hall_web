import clsx from 'clsx';
import { useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from '@mui/material';
import Box from '@mui/system/Box';
import Unauthorised from '../../assets/svg/unauthorised/Unauthorised.svg';
import classes from './UnauthorisedPage.module.css';

export const UnauthorisedPage = () => {
  const { palette } = useTheme();

  return (
    <Box bgcolor={palette.background.paper} height="100%">
      <Stack
        spacing={8}
        direction="column"
        className={classes.content_container}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            component="span"
            color={palette.text.primary}
            className={classes.title}
          >
            403
          </Box>
          <Box
            component="span"
            color={palette.text.primary}
            className={classes.message}
          >
            You don't have the key to open this gate!
          </Box>
        </Box>
        <Box
          component="img"
          src={Unauthorised}
          className={classes.image_container}
        />
        <Box>
          <Box
            component="span"
            display="block"
            color={palette.text.primary}
            className={clsx(classes.message, classes.support)}
          >
            Please contact{' '}
            <Link
              href="mailto:support@craftingsoftware.com"
              underline="hover"
              rel="noopener"
              target="_blank"
              color={palette.text.primary}
            >
              support@craftingsoftware.com
            </Link>{' '}
            for further details.
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

import { Stack, Typography, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import CraftingLogo from '../../assets/svg/CraftingLogo.svg';
import { LoginWhiteBox } from './LoginBox';
import classes from './LoginScreen.module.css';

export const LoginScreen = () => {
  const { palette } = useTheme();

  return (
    <>
      <Stack
        className={classes.header}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap=".65rem"
        sx={{
          padding: '.5rem',
        }}
      >
        <img
          src={CraftingLogo}
          style={{
            background: palette.general.logoBgColor,
            padding: '5px',
            borderRadius: '100%',
            height: '40px',
            width: '40px',
          }}
        />
        <Typography variant="h3" sx={{ color: 'white' }}>
          Guild Hall
        </Typography>
      </Stack>

      <Box className={classes.container}>
        <div className={classes.login_container}>
          <LoginWhiteBox />
        </div>
        <div className={classes.image_container} />
      </Box>
    </>
  );
};

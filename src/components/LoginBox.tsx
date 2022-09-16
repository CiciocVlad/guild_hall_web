import { useContext, useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Typography, useTheme, Stack, Link } from '@mui/material';
import Box from '@mui/material/Box';
import { clientId } from '../consts/consts';
import { TokenContext } from '../context/TokenContext';
import { UserContext } from '../context/UserContext';
import { onSuccess, onFailure } from '../network/requests';
import classes from './LoginBox.module.css';

export const LoginWhiteBox = () => {
  const { user, setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/employees';
  const [error, setError] = useState(false);
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <Stack gap="15vh" justifyContent="space-between">
      <Box
        className={classes.white_box}
        sx={{
          boxShadow: 2,
          borderRadius: 1,
          minWidth: '20rem',
          marginTop: '2rem',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          className={classes.welcome_text}
          sx={{
            fontSize: 48,
            marginTop: 7.5,
            fontFamily: 'Roboto Slab',
            fontWeight: 'bold',
            letterSpacing: '0.3rem',
          }}
        >
          {error ? 'Oops' : 'Welcome!'}
        </Typography>

        <Typography
          variant="h1"
          align="center"
          className={classes.login_text}
          sx={{
            textAlign: 'center',
            color: palette.secondary.contrastText,
          }}
        >
          {error
            ? 'Something went wrong'
            : 'Login with your company account to access the fortress'}
        </Typography>

        <GoogleLogin
          clientId={clientId}
          onSuccess={(e) => onSuccess(e, setToken, setUser, setError)}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          render={(props) => (
            <Button
              variant="contained"
              className={classes.login_button}
              startIcon={error ? null : <GoogleIcon />}
              onClick={props.onClick}
              disabled={props.disabled}
              sx={{
                marginBottom: 7.5,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 26,
                backgroundColor: error
                  ? palette.secondary.main
                  : palette.info.main,
                textTransform: 'none',
                color: error ? 'black' : 'white',
                width: error ? 'fit-content' : '8.75em',
                '&:hover': {
                  background: palette.primary.light,
                },
              }}
            >
              {error ? "Let's get in touch" : 'Google'}
            </Button>
          )}
          isSignedIn={true}
        />
      </Box>

      {!error && (
        <Stack direction="row" justifyContent="center" gap=".3rem">
          <Typography variant="h3" className={classes.need_help_text}>
            Need help?
          </Typography>

          <Link
            href="mailto:contact@craftingsoftware.com"
            underline="hover"
            rel="noopener"
            target="_blank"
            sx={{
              textAlign: 'center',
              padding: '.1rem .3rem .1rem .3rem',
              fontWeight: '700',
              fontFamily: 'Lato',
              color: palette.general.text,
              backgroundColor: palette.secondary.main,
            }}
          >
            Let's get in touch!
          </Link>
        </Stack>
      )}
    </Stack>
  );
};

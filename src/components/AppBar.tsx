import { capitalize } from 'lodash';
import { useContext, useState, MouseEvent, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  AppBar as MAppBar,
  Container,
  Toolbar,
  Avatar,
  Link,
  useTheme,
  Drawer,
  Divider,
  useMediaQuery,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import CraftingLogo from '../../assets/svg/CraftingLogo.svg';
import { maxWidth, clientId } from '../consts/consts';
import { TokenContext, UserContext } from '../context';
import { createRedirectUrl } from '../network/requests';
import { setColorMode } from '../utils/color-mode-storage';
import classes from './AppBar.module.css';
import { BackButton } from './BackButton';
import { Polygon } from './Polygon';
import { ThemeSwitch } from './ThemeSwitch';

export const AppBar = ({
  selectedUserId = null,
  name,
  employee,
  project,
}: {
  selectedUserId?: string | null;
  name?: string;
  employee?: string | null;
  project?: string | null;
}) => {
  const { user, setUser } = useContext(UserContext);
  const [edit, setEdit] = useState(false);

  const Pages = {
    HOME: 'Home',
    EMPLOYEES: 'Employees',
    PROJECTS: 'Projects',
  };

  useEffect(() => {
    setEdit(JSON.parse(window.sessionStorage.getItem('edit')!));
  }, []);

  const validate = (str?: string | null) => str === null || str || str === '';

  const getAppBar = () => {
    if (validate(employee))
      if (edit) return [`Edit ${employee}`];
      else return ['New employee'];

    if (validate(project))
      if (edit) return [`Edit ${project}`];
      else return ['New project'];

    if (!selectedUserId) return Object.values(Pages);

    if (!name) return [''];

    if (name && user?.id !== selectedUserId)
      return [`${name.split(' ')[0]}'s profile`];

    return ['My profile'];
  };

  const check = (str: string) => str.match(/\/(employees|projects)\/?/g);

  const pages = getAppBar();

  const { palette } = useTheme();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isActivePage = (page: string) =>
    window.location.pathname.includes(page.toLowerCase());

  const location = useLocation();
  const currentPath = location.pathname;
  const from = validate(project)
    ? '/projects'
    : location.state?.from?.pathname || '/employees';
  const media = useMediaQuery(maxWidth);

  const [open, setOpen] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };
  const handleClick = async () => {
    const redirect_url = await createRedirectUrl(
      { user_id: selectedUserId },
      token
    );
    setOpen(true);
    navigator.clipboard.writeText(redirect_url.mapping);
  };

  const logout = () => {
    if (setUser && setToken) {
      setUser(null);
      setToken(null);
    }
  };

  if (selectedUserId || validate(employee) || validate(project)) {
    return (
      <MAppBar
        className={classes.container}
        sx={{ background: palette.general.header }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <RouterLink to={from}>
              <BackButton />
            </RouterLink>
            <Box className={classes.content}>
              <Typography
                variant="h1"
                sx={{ color: palette.primary.contrastText }}
              >
                {pages[0]}
              </Typography>
            </Box>
            <div>
              {!validate(employee) && !validate(project) && (
                <Button
                  onClick={handleClick}
                  className={classes.share_button}
                  disableRipple
                  sx={{
                    backgroundColor: palette.status.background,
                    color: palette.general.shareButton,
                  }}
                >
                  {!media && 'share profile'}
                  <ShareIcon className={classes.share_icon} />
                </Button>
              )}
              <Snackbar
                open={open}
                autoHideDuration={null}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  className={classes.alert}
                  sx={{
                    '& .MuiAlert-icon': {
                      fontSize: 25,
                      color: 'var(--color-green300)',
                    },
                  }}
                  severity="success"
                >
                  Link copied to clipboard
                </Alert>
              </Snackbar>
            </div>
          </Toolbar>
        </Container>
      </MAppBar>
    );
  }

  if (media && !selectedUserId) {
    return (
      <MAppBar
        className={classes.container}
        sx={{ background: palette.general.header }}
      >
        <Container>
          <Toolbar disableGutters>
            <Box className={classes.menu_button_mobile}>
              <IconButton
                size="large"
                onClick={() => setIsDrawerOpen(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
              >
                <Box
                  className={classes.overlay}
                  sx={{ backgroundColor: palette.primary.main }}
                >
                  <Box className={classes.buttons_overlay}>
                    <Box className={classes.theme_switch_container}>
                      <Box className={classes.theme_switch_label}>
                        <Typography
                          variant="body1"
                          color={palette.primary.contrastText}
                        >
                          Theme
                        </Typography>
                        <Typography
                          variant="body2"
                          color={palette.primary.contrastText}
                          sx={{ opacity: 0.6 }}
                        >
                          {capitalize(palette.mode)}
                        </Typography>
                      </Box>
                      <ThemeSwitch
                        onChange={({ target }) =>
                          setColorMode(target.checked ? 'dark' : 'light')
                        }
                        checked={palette.mode === 'dark'}
                      />
                    </Box>
                    <IconButton
                      size="large"
                      onClick={() => setIsDrawerOpen(false)}
                      color="inherit"
                    >
                      <CloseIcon sx={{ color: palette.primary.contrastText }} />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexGrow: 3,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {pages.map((page) => (
                      <Link
                        onClick={() => setIsDrawerOpen(false)}
                        key={page}
                        href={`/${page.toLowerCase()}`}
                        underline="none"
                        sx={{
                          my: 2,
                        }}
                      >
                        <Typography
                          variant="h1"
                          sx={{
                            opacity: isActivePage(page) ? 1 : 0.7,
                            color: palette.primary.contrastText,
                          }}
                        >
                          {isActivePage(page) ? (
                            <Polygon
                              color={palette.primary.contrastText}
                              style={{ marginRight: '0.5rem' }}
                            />
                          ) : (
                            ''
                          )}
                          {page}
                        </Typography>
                      </Link>
                    ))}
                    <Divider
                      variant="middle"
                      sx={{ width: '10rem', my: 3, opacity: '0.12' }}
                      color={palette.primary.contrastText}
                    />
                    <Link
                      onClick={() => setIsDrawerOpen(false)}
                      href={`/employees/${user?.id}`}
                      underline="none"
                      sx={{
                        color: palette.primary.contrastText,
                        my: 2,
                        opacity: 0.7,
                      }}
                    >
                      <Typography variant="h1">My profile</Typography>
                    </Link>
                  </Box>
                  <Link
                    onClick={() => setIsDrawerOpen(false)}
                    href={`/employees/${user?.id}`}
                    underline="none"
                    sx={{
                      color: palette.primary.contrastText,
                      mt: 2,
                      mb: 8,
                      opacity: 0.7,
                    }}
                  >
                    <GoogleLogout
                      clientId={clientId}
                      onLogoutSuccess={logout}
                      icon={false}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          style={{
                            border: 'none',
                            outline: 'none',
                            background: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <Typography variant="body1" color="text.secondary">
                            Logout
                          </Typography>
                        </button>
                      )}
                    ></GoogleLogout>
                  </Link>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MAppBar>
    );
  }

  return (
    <MAppBar
      className={classes.container}
      sx={{ background: palette.general.header }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <img
            src={CraftingLogo}
            className={classes.logo}
            style={{ background: palette.general.logoBgColor }}
          />
          <Box className={classes.content}>
            {pages.map((page) => (
              <Link
                key={page}
                href={`/${page.toLowerCase()}`}
                underline="none"
                sx={{ color: palette.primary.contrastText, mx: 2 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    opacity: isActivePage(page) ? 1 : 0.7,
                    color: palette.primary.contrastText,
                  }}
                >
                  {page}
                </Typography>
              </Link>
            ))}
          </Box>
          {check(currentPath) && (
            <Button
              variant="text"
              onClick={handleOpenUserMenu}
              startIcon={<Avatar alt={user?.name} src={user?.avatar} />}
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    color: palette.primary.contrastText,
                  }}
                />
              }
              sx={{
                textTransform: 'none',
                borderRadius: '1.875rem',
                backgroundColor: anchorElUser
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
                '& .MuiButton-startIcon': {
                  marginRight: 0,
                },
                '& .MuiButton-endIcon': {
                  marginLeft: 0,
                  transform: anchorElUser && 'rotate(180deg)',
                  '& svg': {
                    fontSize: '2rem',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  marginLeft: '0.5rem',
                  color: palette.primary.contrastText,
                }}
              >
                {user?.preferred_name}
              </Typography>
            </Button>
          )}
          <Menu
            PaperProps={{
              style: {
                overflowY: 'hidden',
                minWidth: '220px',
              },
            }}
            sx={{
              mt: '3.5rem',
            }}
            id="menu-appbar"
            keepMounted
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Link
                onClick={() => setIsDrawerOpen(false)}
                href={`/employees/${user?.id}`}
                underline="none"
                sx={{
                  color: palette.primary.contrastText,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  My profile
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              onClick={() =>
                setColorMode(palette.mode === 'light' ? 'dark' : 'light')
              }
            >
              <div>
                <Typography variant="body1" color="text.secondary">
                  Theme
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ opacity: 0.7 }}
                >
                  {capitalize(palette.mode)}
                </Typography>
              </div>
              <ThemeSwitch checked={palette.mode === 'dark'} />
            </MenuItem>
            <MenuItem>
              <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={logout}
                icon={false}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Logout
                    </Typography>
                  </button>
                )}
              ></GoogleLogout>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </MAppBar>
  );
};

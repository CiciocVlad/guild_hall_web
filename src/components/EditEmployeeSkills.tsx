import { useContext, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Menu,
  MenuItem,
  MenuProps,
  Snackbar,
  styled,
  useTheme,
} from '@mui/material';
import { TokenContext } from '../context';
import { getTechnologies } from '../network/requests';
import classes from './EditEmployeeSkills.module.css';
import { Skill } from './EmployeePage';
import { Loading } from './Loading';
import load from './Loading.module.css';
import { Section } from './Section';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '1.25rem',
    marginTop: theme.spacing(1),
    minWidth: 180,
  },
}));

export const EditEmployeeSkills = ({ id }: { id: string | null }) => {
  const [_skills, setSkills] = useState<Skill[]>([]);
  const [_favoriteSkills, setFavoriteSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(TokenContext);
  const { palette } = useTheme();
  const [severity, _setSeverity] = useState<AlertColor>('success');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const skills = await getTechnologies(token, id!);
      if (skills) {
        setFavoriteSkills(skills.filter((skill: Skill) => skill.is_favorite));
        setSkills(skills.filter((skill: Skill) => !skill.is_favorite));
      }
      setLoading(false);
    })();
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return loading ? (
    <Box className={load.load}>
      <Loading color={palette.text.secondary} text="Loading..." />
    </Box>
  ) : (
    <Box sx={{ minHeight: '95vh' }}>
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
          sx={{
            '& .MuiAlert-icon': {
              fontSize: 25,
              color: 'var(--color-green300)',
            },
          }}
          severity={severity}
        >
          {alert}
        </Alert>
      </Snackbar>
      <Section
        title="Type"
        children={
          <Box className={classes.wrapper}>
            <Button
              className={classes.button}
              onClick={(event) => setAnchorEl(event.currentTarget)}
              endIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: palette.background.paper,
                color: palette.general.text,
              }}
            >
              Technologies
            </Button>
            <StyledMenu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>Ceva</MenuItem>
            </StyledMenu>
          </Box>
        }
      />
      <Section title="Name" children={<Box></Box>} />
    </Box>
  );
};

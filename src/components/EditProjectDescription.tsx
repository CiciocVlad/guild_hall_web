import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  TextareaAutosize,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  AlertColor,
} from '@mui/material';
import { maxWidth, mediumWidth, minWidth } from '../consts/consts';
import { TokenContext } from '../context';
import { handleChange } from '../helpers/handleChange';
import { createProject, updateProject } from '../network/requests';

export const EditProjectDescription = ({
  id,
  title,
  category,
  description,
  setDescription,
  disabled,
  setDisabled,
}: {
  id?: string | null;
  title: string | null;
  category: string | null;
  description: string | null;
  setDescription: (description: string | null) => void;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
}) => {
  const { palette } = useTheme();
  const media = useMediaQuery(maxWidth);
  const medium = useMediaQuery(mediumWidth);
  const min = useMediaQuery(minWidth);
  const [edit, setEdit] = useState(false);
  const { token } = useContext(TokenContext);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    setEdit(JSON.parse(window.sessionStorage.getItem('edit')!));
  }, []);

  const renderButton = ({
    text,
    color,
    fontColor,
    start,
    onClick,
    disabled = false,
  }: {
    text: string;
    color?: string;
    fontColor?: string;
    start?: number;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: '1.6rem',
        backgroundColor: color,
        color: fontColor,
        fontSize: '1.25rem',
        padding: '0.2rem 1.8rem',
        textTransform: 'none',
        gridColumn: start,
      }}
      disabled={disabled}
    >
      {text}
    </Button>
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const onClick = async () => {
    const categoryToSend = category ?? '';
    setDescription(description ?? '');
    if (edit) {
      const { status } = await updateProject(
        token,
        { title, category: categoryToSend, description },
        id
      );
      if (status === 200) {
        setSeverity('success');
        setAlert('Your project was updated successfully!');
      } else {
        setSeverity('error');
        setAlert('OOPS! There was an error in saving the data');
      }
    } else {
      const { status } = await createProject(token, {
        title,
        category: categoryToSend,
        description,
      });
      if (status === 200) {
        setSeverity('success');
        setAlert('Your new project was added successfully!');
      } else {
        setSeverity('error');
        setAlert('OOPS! There was an error in saving the data');
      }
    }
    setOpen(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: palette.general.frame,
        borderRadius: '1.25rem 1.25rem 0 0',
        marginTop: '1.25rem',
        width: media ? '80%' : '50%',
      }}
    >
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
      <Typography
        variant="h2"
        sx={{
          color: palette.text.secondary,
          fontSize: '1.25rem',
          margin: '1rem',
        }}
      >
        Description
      </Typography>
      <Box
        sx={{
          display: 'flex',
          margin: '0 1rem 1rem 1rem',
          flexGrow: 1,
        }}
      >
        <TextareaAutosize
          minRows={10}
          placeholder="Your project's description here"
          value={description ?? ''}
          onChange={(e) =>
            handleChange(e, [title!, category!], setDisabled, setDescription)
          }
          style={{
            resize: 'none',
            color: palette.text.secondary,
            width: '100%',
            borderRadius: '1.25rem',
            padding: '1rem',
            backgroundColor: palette.project.input,
          }}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: min
            ? '0 1fr 1fr 0'
            : medium
            ? '0.3fr 1fr 1fr 0.3fr'
            : '2fr 1.5fr 1.5fr 2fr',
          justifyContent: 'center',
          padding: '1rem',
          gap: '1.5rem',
        }}
      >
        {renderButton({
          text: 'Cancel',
          color: palette.project.cancel,
          fontColor: palette.primary.contrastText,
          start: 2,
          onClick: () => window.location.replace('/projects'),
        })}
        {renderButton({
          text: 'Save',
          color: palette.general.shareButton,
          fontColor: palette.secondary.contrastText,
          start: 3,
          onClick,
          disabled,
        })}
      </Box>
    </Box>
  );
};

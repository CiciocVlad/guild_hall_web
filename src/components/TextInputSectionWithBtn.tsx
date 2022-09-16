import { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  FormLabel,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { minWidth, mediumWidth } from '../consts/consts';
import { CustomButton } from './CustomButton';

const options = {
  shouldForwardProp: (prop: string) =>
    prop !== 'fontColor' && prop !== 'backColor',
};

const CustomTextField = styled(
  TextField,
  options
)(({ fontColor, backColor }: { fontColor: string; backColor?: string }) => ({
  input: {
    padding: '0.6rem 2rem 0.6rem 1rem',
    color: fontColor,
    backgroundColor: backColor,
    borderRadius: '1.25rem',
  },
  '& fieldset': {
    borderRadius: '1.25rem',
  },
}));

export const TextInputSectionWithBtn = ({
  title,
  label,
  field,
  setField,
  disabled,
}: {
  title: string;
  label: string;
  field: string | null;
  setField: (value: string | null) => void;
  disabled: boolean;
}) => {
  const { palette } = useTheme();
  const medium = useMediaQuery(mediumWidth);
  const min = useMediaQuery(minWidth);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEdit(JSON.parse(window.sessionStorage.getItem('edit')!));
  });

  return (
    <Box
      sx={{
        backgroundColor: palette.general.frame,
        marginTop: '1.25rem',
        width: '100%',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: palette.text.secondary,
          fontSize: '1.25rem',
          margin: '1rem',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', margin: '0 1rem 1rem 1rem', gap: '1.25rem' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            color: palette.text.secondary,
          }}
        >
          <FormLabel
            sx={{
              opacity: 0.6,
              fontSize: '0.75rem',
              margin: '0 0 0.25rem 1rem',
            }}
          >
            {label}
          </FormLabel>
          <CustomTextField
            fontColor={palette.text.secondary}
            backColor={palette.project.input}
            value={field !== 'null' && field !== null ? field : ''}
            onChange={(e) => setField(e.target.value)}
          />
        </Box>
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
        <CustomButton
          text="Cancel"
          color={palette.project.cancel}
          fontColor={palette.primary.contrastText}
          start={2}
          onClick={() => window.location.replace('/employees')}
        />
        <CustomButton
          text={edit ? 'Update' : 'Save'}
          color={palette.general.shareButton}
          fontColor={palette.secondary.contrastText}
          start={3}
          onClick={() => {}}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

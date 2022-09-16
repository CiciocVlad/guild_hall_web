import {
  Box,
  FormLabel,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { maxWidth } from '../consts/consts';

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

export const NameInputsContainer = ({
  title,
  firstFieldLabel,
  firstField,
  setFirstField,
  secondFieldLabel,
  secondField,
  setSecondField,
  setDisabled,
}: {
  title: string;
  firstFieldLabel: string;
  firstField: string | null;
  setFirstField: (value: string | null) => void;
  secondFieldLabel: string;
  secondField: string | null;
  setSecondField: (value: string | null) => void;
  setDisabled: (value: boolean) => void;
}) => {
  const { palette } = useTheme();
  const media = useMediaQuery(maxWidth);

  const renderLabel = (
    label: string,
    setName: (name: string | null) => void,
    name?: string | null
  ) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        color: palette.text.secondary,
      }}
    >
      <FormLabel
        sx={{ opacity: 0.6, fontSize: '0.75rem', margin: '0 0 0.25rem 1rem' }}
      >
        {label}
      </FormLabel>
      <CustomTextField
        fontColor={palette.text.secondary}
        backColor={palette.project.input}
        value={name !== 'null' && name !== null ? name : ''}
        onChange={(e) => {
          setName(e.target.value);
          if (e.target.value !== null && e.target.value !== 'null')
            setDisabled(false);
          if (e.target.value === '') setDisabled(true);
        }}
      />
    </Box>
  );

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
      <Box
        sx={{
          display: media ? 'block' : 'flex',
          margin: '0 1rem 1rem 1rem',
          gap: '1.25rem',
        }}
      >
        {renderLabel(firstFieldLabel, setFirstField, firstField)}
        {renderLabel(secondFieldLabel, setSecondField, secondField)}
      </Box>
    </Box>
  );
};

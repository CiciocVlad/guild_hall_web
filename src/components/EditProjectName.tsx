import React from 'react';
import {
  Box,
  useTheme,
  TextField,
  styled,
  Typography,
  FormLabel,
  useMediaQuery,
} from '@mui/material';
import { maxWidth } from '../consts/consts';
import { handleChange } from '../helpers/handleChange';

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

export const EditProjectName = ({
  title,
  setTitle,
  category,
  setCategory,
  description,
  setDisabled,
}: {
  title?: string | null;
  setTitle: (title: string | null) => void;
  category?: string | null;
  setCategory: (category: string | null) => void;
  description?: string | null;
  setDisabled: (value: boolean) => void;
}) => {
  const { palette } = useTheme();
  const media = useMediaQuery(maxWidth);

  const renderLabel = (
    label: string,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
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
        value={name ?? ''}
        onChange={onChange}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: palette.general.frame,
        borderRadius: '20px 20px 0 0',
        marginTop: '1.25rem',
        width: media ? '80%' : '50%',
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
        Name
      </Typography>
      <Box
        sx={{
          display: media ? 'block' : 'flex',
          margin: '0 1rem 1rem 1rem',
          gap: '1.25rem',
        }}
      >
        {renderLabel(
          'Project Name',
          (e) =>
            handleChange(e, [category!, description!], setDisabled, setTitle),
          title
        )}
        {renderLabel(
          'Category',
          (e) =>
            handleChange(e, [name!, description!], setDisabled, setCategory),
          category
        )}
      </Box>
    </Box>
  );
};

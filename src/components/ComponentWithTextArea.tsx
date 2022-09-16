import { Box, TextareaAutosize, Typography, useTheme } from '@mui/material';

export const ComponentWithTextArea = ({
  title,
  placeholder,
  description,
  setDescription,
}: {
  title: string;
  placeholder: string;
  description: string | null;
  setDescription: (value: string | null) => void;
}) => {
  const { palette } = useTheme();

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
      <Box sx={{ display: 'flex', margin: '0 1rem 1rem 1rem', flexGrow: 1 }}>
        <TextareaAutosize
          minRows={5}
          placeholder={placeholder}
          value={
            description !== 'null' && description !== null ? description : ''
          }
          onChange={(e) => setDescription(e.target.value)}
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
    </Box>
  );
};

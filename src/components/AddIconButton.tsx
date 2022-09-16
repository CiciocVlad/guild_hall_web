import AddIcon from '@mui/icons-material/Add';
import { IconButton, useTheme } from '@mui/material';
import classes from './AddIconButton.module.css';

export const AddIconButton = ({ onClick }: { onClick: () => void }) => {
  const { palette } = useTheme();

  return (
    <IconButton onClick={onClick}>
      <AddIcon
        className={classes.icon}
        sx={{
          backgroundColor: palette.secondary.main,
          color: palette.project.add,
        }}
      />
    </IconButton>
  );
};

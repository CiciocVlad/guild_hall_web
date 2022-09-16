import { Button } from '@mui/material';
import classes from './CustomButton.module.css';

export const CustomButton = ({
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
    className={classes.button}
    onClick={onClick}
    sx={{
      backgroundColor: color,
      color: fontColor,
      gridColumn: start,
    }}
    disabled={disabled}
  >
    {text}
  </Button>
);

import { ReactNode } from 'react';
import { useTheme, Button as MUIButton } from '@mui/material';

export const Button = ({
  children,
  variant = 'contained',
  type = 'primary',
  size = 'medium',
  onClick,
}: {
  children: ReactNode;
  variant?: any;
  type?: string;
  size?: string;
  onClick?: () => void;
}) => {
  const { palette } = useTheme();

  const getColor = () => {
    switch (type) {
      case 'primary':
        return palette.button.primary.background;
      case 'secondary':
        return palette.button.secondary.background;
      default:
        return palette.general.background;
    }
  };

  const getBackgroundColorOnHover = () => {
    switch (type) {
      case 'primary':
        return palette.button.primary.hoverBackground;
      case 'secondary':
        return palette.button.secondary.hoverBackground;
      default:
        return palette.general.background;
    }
  };

  return (
    <MUIButton
      variant={variant}
      sx={{
        borderRadius: 26,
        padding: size === 'large' ? '0.78rem 2.25rem' : '0.4rem 2.40rem',
        backgroundColor: getColor(),
        '&:hover': {
          background: getBackgroundColorOnHover(),
        },
      }}
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
};

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { maxWidth } from '../consts/consts';
import classes from './EmployeeInfos.module.css';

export const Section = ({
  title,
  badges = [],
  children,
}: {
  title: string;
  badges?: string[];
  children: JSX.Element;
}) => {
  const { palette } = useTheme();
  const media = useMediaQuery(maxWidth);

  return (
    <Box
      className={classes.section_boxstyle}
      sx={{
        backgroundColor: palette.general.frame,
      }}
    >
      <Box className={classes.sectionTitle}>
        <Typography
          variant="subtitle1"
          sx={{
            lineHeight: '3em',
            color: palette.general.text,
            marginLeft: media ? '-1rem' : '1rem',
          }}
        >
          {title}
        </Typography>
        {badges.map((badge, index) => (
          <Typography
            key={index}
            variant="body1"
            color={palette.badge.text}
            bgcolor={palette.badge.accent}
            borderRadius="0.125rem"
            padding="0.0625rem 0.25rem"
            marginLeft="1rem"
            alignSelf="center"
          >
            {badge}
          </Typography>
        ))}
      </Box>
      {children}
    </Box>
  );
};

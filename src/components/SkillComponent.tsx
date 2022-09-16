import { Box, Typography, useTheme } from '@mui/material';
import { iconImageURL } from '../utils/icon-assets';
import { Skill } from './EmployeePage';
import classes from './SkillComponent.module.css';

export const SkillComponent = ({ skill }: { skill?: Skill }) => {
  const { palette } = useTheme();
  return (
    <Box className={classes.icons} key={skill?.name}>
      <img
        src={iconImageURL(skill?.name, 'big')}
        onError={({ currentTarget }) => {
          if (currentTarget.dataset.defaultIcon == 'false') {
            currentTarget.dataset.defaultIcon = 'true';
            currentTarget.src = iconImageURL(undefined, 'big');
          }
        }}
        data-default-icon={skill?.name == undefined}
        key={skill?.id}
        className={classes.skills}
        style={{ width: '86px', height: '86px' }}
      />
      <Typography sx={{ color: palette.text.secondary }}>
        {skill?.name}
      </Typography>
    </Box>
  );
};

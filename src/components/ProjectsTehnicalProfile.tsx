import { Box, Icon, Typography, useMediaQuery } from '@mui/material';
import { maxWidth, mediumWidth, minWidth } from '../consts/consts';
import { Attribute, Project } from '../context';
import { darkPalette, lightPalette } from '../theme';
import { iconImageURL } from '../utils/icon-assets';
import classes from './ProjectsTechnicalProfile.module.css';

export const ProjectsTehnicalProfile = ({
  projects,
}: {
  projects?: Array<Project>;
}) => {
  const media = useMediaQuery(maxWidth);
  const medium = useMediaQuery(mediumWidth);
  const min = useMediaQuery(minWidth);

  const leftArrows = (title?: string | null) => (
    <Typography
      variant="h4"
      sx={{
        color: darkPalette.text.secondary,
        fontSize: !medium ? '2.5rem' : '2rem',
      }}
    >
      <span
        className={`${classes.angle_brackets} ${classes.angle_brackets_skills}`}
        style={{ fontWeight: 300 }}
      >
        {'>>> '}
      </span>
      <span
        className={classes.industries_skills_brackets}
        style={{ fontWeight: 300 }}
      >
        {'>>>'}
      </span>
      {title}
      <span
        className={classes.industries_skills_brackets}
        style={{ fontWeight: 300 }}
      >
        {'=%{'}
      </span>
    </Typography>
  );

  const leftSide = (project: Project) => (
    <Box className={classes.left}>
      {leftArrows(project?.title)}
      <Typography
        variant="subtitle2"
        sx={{
          color: lightPalette.technical_profile.primary,
          marginTop: '1.43rem',
        }}
      >
        {project?.attributes
          ?.map((attribute: Attribute) => attribute.name)
          .join(', ')}
      </Typography>
      <Box
        sx={{
          marginTop: '1.43rem',
          display: 'flex',
          gap: '1.25rem',
          justifyContent: 'right',
        }}
      >
        {project!.attributes!.map((attribute: Attribute) => (
          <Icon
            key={attribute.name}
            sx={{ width: 'fit-content', height: 'fit-content' }}
          >
            <img src={iconImageURL(attribute.name, 'small')} />
          </Icon>
        ))}
      </Box>
    </Box>
  );

  const rightSide = (project: Project) => (
    <Box className={classes.right}>
      <Typography variant="h4" sx={{ color: darkPalette.status.offline }}>
        {project?.category}
      </Typography>
      <Typography
        sx={{
          color: lightPalette.technical_profile.primary,
          marginTop: '1.43rem',
        }}
      >
        Project Description
      </Typography>
      <Typography sx={{ color: darkPalette.technical_profile.primary }}>
        {project?.description}
        <span style={{ color: lightPalette.technical_profile.primary }}>
          {' _}'}
        </span>
      </Typography>
      <Typography
        sx={{
          color: lightPalette.technical_profile.primary,
          marginTop: '1.43rem',
        }}
      >
        Impact
      </Typography>
      <Typography sx={{ color: darkPalette.technical_profile.primary }}>
        {project?.user_impact}
        <span style={{ color: lightPalette.technical_profile.primary }}>
          {' _}'}
        </span>
      </Typography>
    </Box>
  );

  const mobile = (project: Project) => (
    <Box className={classes.left}>
      {leftArrows(project?.title)}
      <Typography
        variant="h4"
        sx={{ color: darkPalette.status.offline, fontSize: '2rem' }}
      >
        {project?.category}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginTop: '1.43rem',
          textAlign: 'left',
          padding: min ? '0 3.75rem' : '0 1.25rem',
        }}
      >
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: lightPalette.technical_profile.primary }}
          >
            Technologies
          </Typography>
          <Typography sx={{ color: darkPalette.status.offline }}>
            {project?.attributes
              ?.map((attribute: Attribute) => attribute.name)
              .join(', ')}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: lightPalette.technical_profile.primary }}
          >
            Project Description
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: darkPalette.technical_profile.primary }}
          >
            {project?.description}
            <span style={{ color: lightPalette.technical_profile.primary }}>
              {' _}'}
            </span>
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: lightPalette.technical_profile.primary }}
          >
            Impact
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: darkPalette.technical_profile.primary }}
          >
            {project?.user_impact}
            <span style={{ color: lightPalette.technical_profile.primary }}>
              {' _}'}
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box className={classes.wrapper}>
      <Typography
        variant="h4"
        sx={{
          width: !media ? '38%' : '100%',
          color: darkPalette.technical_profile.primary,
          fontSize: medium ? '2rem' : '2.5rem',
          textAlign: !media ? 'right' : 'center',
          margin: '2.37rem 0',
        }}
      >
        {medium ? 'Featured projects' : 'Projects'}
      </Typography>
      {projects?.map((project: Project) =>
        !media ? (
          <Box className={classes.container} key={project?.title}>
            {leftSide(project)}
            {rightSide(project)}
          </Box>
        ) : (
          <Box key={project?.title} sx={{ width: '100%' }}>
            {mobile(project)}
          </Box>
        )
      )}
    </Box>
  );
};

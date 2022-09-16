import { Stack, Typography, Box } from '@mui/material';
import { getCssVar } from '../utils/css-vars-to-js';
import { iconImageURL } from '../utils/icon-assets';
import classes from './TechnologiesComponent.module.css';

const TechnologyCard = ({ name }: { name: string }) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    direction="column"
    gap=".4rem"
  >
    <img
      src={iconImageURL(name, 'big')}
      onError={({ currentTarget }) => {
        if (currentTarget.dataset.defaultIcon == 'false') {
          currentTarget.dataset.defaultIcon = 'true';
          currentTarget.src = iconImageURL(undefined, 'big');
        }
      }}
      data-default-icon={name == undefined}
    />
    <Typography variant="h2" color="white">
      {name}
    </Typography>
  </Stack>
);

export const TechnologiesComponent = ({
  technologies,
}: {
  technologies: string[] | null;
}) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    direction="column"
    gap="2rem"
    marginTop="3rem"
    sx={{
      background: getCssVar('--color-purple400'),
      padding: '2rem 0 2rem 0',
    }}
  >
    <Stack direction="row" gap="1rem">
      <Typography
        fontSize="2rem"
        color={getCssVar('--color-purple200')}
        className={classes.left_bracket}
      >
        {'</'}
      </Typography>

      <Typography
        variant="h1"
        color={getCssVar('--color-white')}
        fontSize="2rem"
        letterSpacing="1px"
        alignSelf="center"
      >
        Technologies
      </Typography>

      <Typography
        fontSize="2rem"
        color={getCssVar('--color-purple200')}
        className={classes.right_bracket}
      >
        {'>'}
      </Typography>
    </Stack>

    <Box className={classes.tech_container}>
      {technologies?.map((tech: string) => (
        <TechnologyCard name={tech} />
      ))}
    </Box>
  </Stack>
);

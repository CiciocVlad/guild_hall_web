import { Avatar, AvatarGroup, Box, Typography, useTheme } from '@mui/material';
import classes from './UserProjectCard.module.css';

interface ProjectInfo {
  projectName?: string;
  role?: string;
  avatars?: any;
}

export const UserProjectCard = ({
  projectName,
  role,
  avatars,
}: ProjectInfo) => {
  const { palette } = useTheme();

  return (
    <Box
      className={classes.container}
      sx={{
        backgroundColor: palette.general.frame,
        boxShadow: 2,
        padding: '1.5rem 1.25rem',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: palette.text.primary,
        }}
      >
        Project Name: {projectName}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          color: palette.text.secondary,
        }}
      >
        Role: {role}
      </Typography>
      {avatars.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: palette.text.secondary,
            }}
          >
            Colleagues
          </Typography>
          <Box sx={{ marginLeft: '0.3rem' }}>
            <AvatarGroup
              max={4}
              sx={{
                height: '1.6rem',
                '& .MuiAvatar-root': {
                  width: '1.6rem',
                  height: '1.6rem',
                  fontSize: 15,
                  border: 0,
                  marginLeft: '-0.4rem',
                },
              }}
            >
              {avatars?.map((a: string, index: number) => (
                <Avatar
                  key={index}
                  variant="circular"
                  src={a}
                  sx={{
                    width: '1.6rem',
                    height: '1.6rem',
                  }}
                />
              ))}
            </AvatarGroup>
          </Box>
        </Box>
      )}
    </Box>
  );
};

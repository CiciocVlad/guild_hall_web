import { useContext, useEffect, useState } from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { UserContext } from '../context';
import classes from './ProjectCard.module.css';

export const ProjectCard = ({
  id,
  title,
  category,
  description,
  onClick,
}: {
  id: string;
  title: string;
  category: string;
  description: string;
  onClick?: () => void;
}) => {
  const { palette } = useTheme();
  const { user } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState<string | null>(null);
  const [projectCategory, setProjectCategory] = useState<string | null>(null);
  const [projectDescription, setProjectDescription] = useState<string | null>(
    null
  );

  useEffect(() => {
    window.sessionStorage.setItem('edit', edit.toString());
  }, [edit]);

  useEffect(() => {
    window.sessionStorage.setItem('id', projectId!);
    window.sessionStorage.setItem('title', projectTitle!);
    window.sessionStorage.setItem('category', projectCategory!);
    window.sessionStorage.setItem('description', projectDescription!);
  }, [projectId, projectTitle, projectCategory, projectDescription]);

  return (
    <Box
      className={classes.container}
      sx={{ backgroundColor: palette.project.background }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: '2.5rem' }}>
          <Typography variant="subtitle2" sx={{ color: palette.text.primary }}>
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: palette.text.secondary }}
          >
            {category}
          </Typography>
        </Box>
        {user?.is_admin && (
          <IconButton
            sx={{ padding: 0 }}
            onClick={() => {
              setEdit(true);
              setProjectId(id);
              setProjectTitle(title);
              setProjectCategory(category);
              setProjectDescription(description);
              window.location.replace('/projects/edit');
            }}
          >
            <ModeEditOutlineIcon
              sx={{
                color: palette.project.edit,
                fontSize: '1.8rem',
                margin: '-0.25rem -2.5rem 0 0',
                '&:hover': {
                  color: palette.text.primary,
                },
              }}
            />
          </IconButton>
        )}
      </Box>
      <Typography variant="h2" sx={{ color: palette.text.secondary }}>
        {description !== null && description !== 'null' ? description : ''}
      </Typography>
    </Box>
  );
};

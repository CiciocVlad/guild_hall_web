import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { getFromSession } from '../helpers/getFromSession';
import { AppBar } from './AppBar';
import { Content } from './Content';
import { EditProjectDescription } from './EditProjectDescription';
import { EditProjectName } from './EditProjectName';
import { LayoutContainer } from './LayoutContainer';

export const EditProject = () => {
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setId(getFromSession('id'));
    setTitle(getFromSession('title'));
    setCategory(getFromSession('category'));
    setDescription(getFromSession('description'));
  }, []);

  useEffect(() => {
    setEdit(JSON.parse(window.sessionStorage.getItem('edit')!));
    setDisabled(!edit);
  }, [edit]);

  return (
    <LayoutContainer>
      <AppBar project={title} />
      <Content>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <EditProjectName
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            description={description}
            setDisabled={setDisabled}
          />
          <EditProjectDescription
            id={id}
            title={title}
            category={category}
            description={description}
            setDescription={setDescription}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        </Box>
      </Content>
    </LayoutContainer>
  );
};

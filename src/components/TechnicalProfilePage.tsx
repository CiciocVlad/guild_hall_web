import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box } from '@mui/material';
import { Project, TokenContext } from '../context';
import { getTechnicalProfileData } from '../network/requests';
import { ProjectsTehnicalProfile } from './ProjectsTehnicalProfile';
import { TechnicalIndustries } from './TechnicalIndustries';
import classes from './TechnicalProfilePage.module.css';
import { TechnicalSkills } from './TechnicalSkills';
import { TechnicalUserInfo } from './TechnicalUserInfo';
import { TechnologiesComponent } from './TechnologiesComponent';

export interface PublicUser {
  avatar: string;
  bio: string | null;
  department: string[];
  email: string;
  job_title: string | null;
  name: string;
  number_of_industries: string;
  number_of_projects: string;
  preferred_name: string;
  soft_skills: string[];
  years_of_experience: string;
}

export interface TechnicalData {
  industries: string[];
  projects: Project[];
  skills: string[];
  technologies: string[] | null;
  user: PublicUser;
}

export const TechnicalProfilePage = () => {
  const { mapping } = useParams();
  const { token } = useContext(TokenContext);
  const [technicalData, setTechnicalData] = useState<TechnicalData>();
  useEffect(() => {
    (async () => {
      const data = await getTechnicalProfileData(token, mapping);
      setTechnicalData(data);
    })();
  }, []);

  return (
    <Box className={classes.container}>
      <TechnicalUserInfo user={technicalData?.user} />
      <TechnologiesComponent
        technologies={
          technicalData?.technologies ? technicalData.technologies : null
        }
      />
      <TechnicalIndustries industries={technicalData?.industries} />
      <TechnicalSkills skills={technicalData?.skills} />
      <ProjectsTehnicalProfile projects={technicalData?.projects} />
    </Box>
  );
};

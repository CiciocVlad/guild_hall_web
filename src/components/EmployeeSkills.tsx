import { Box } from '@mui/material';
import { Skill } from './EmployeePage';
import classes from './EmployeeSkills.module.css';
import { Section } from './Section';
import { SkillComponent } from './SkillComponent';

export const EmployeeSkills = ({
  favoriteSkills,
  skills,
}: {
  favoriteSkills?: Skill[];
  skills?: Skill[];
}) => (
  <Box sx={{ minHeight: '95vh' }}>
    <Section
      title={'Masteries'}
      children={
        <Box className={classes.container}>
          {favoriteSkills?.map((skill: Skill) => (
            <SkillComponent skill={skill} key={skill.id} />
          ))}
        </Box>
      }
    />
    <Section
      title={'Other skills'}
      children={
        <Box className={classes.container}>
          {skills?.map((skill: Skill) => (
            <SkillComponent skill={skill} key={skill.id} />
          ))}
        </Box>
      }
    />
  </Box>
);

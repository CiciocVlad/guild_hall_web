import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { UserContext } from '../context';
import { isAdmin } from '../helpers/userHelpers';
import classes from './EmployeeCard.module.css';

export interface Employee {
  id: string;
  avatar: string;
  name: string;
  preferred_name: string;
  bio: string;
  phone: string;
  email: string;
  hobbies: string;
  joined_date: string;
  left_date: string;
  is_working?: boolean;
  job_title?: string;
  attributes?: Array<{ id: string; name: string }>;
}

export const EmployeeCard = (props: Employee) => {
  const { palette } = useTheme();
  const { user } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [employeeName, setEmployeeName] = useState<string | null>(null);
  const [employeePreferredName, setEmployeePreferredName] = useState<
    string | null
  >(null);
  const [employeeBio, setEmployeeBio] = useState<string | null>(null);
  const [employeePhone, setEmployeePhone] = useState<string | null>(null);
  const [employeeEmail, setEmployeeEmail] = useState<string | null>(null);
  const [employeeHobbies, setEmployeeHobbies] = useState<string | null>(null);
  const [employeeStartDate, setEmployeeStartDate] = useState<string | null>(
    null
  );

  useEffect(() => {
    window.sessionStorage.setItem('edit', edit.toString());
  }, [edit]);

  useEffect(() => {
    window.sessionStorage.setItem('id', employeeId!);
    window.sessionStorage.setItem('name', employeeName!);
    window.sessionStorage.setItem('preferredName', employeePreferredName!);
    window.sessionStorage.setItem('bio', employeeBio!);
    window.sessionStorage.setItem('phone', employeePhone!);
    window.sessionStorage.setItem('email', employeeEmail!);
    window.sessionStorage.setItem('hobbies', employeeHobbies!);
    window.sessionStorage.setItem('startDate', employeeStartDate!);
  }, [
    employeeId,
    employeeName,
    employeePreferredName,
    employeeBio,
    employeePhone,
    employeeEmail,
    employeeHobbies,
    employeeStartDate,
  ]);

  return (
    <Card
      className={classes.wrapper}
      sx={{
        backgroundColor: props.left_date
          ? palette.general.employeeCardLeft
          : palette.general.employeeCard,
      }}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <Link
          to={`/employees/${props.id}`}
          state={{ name: props.name }}
          style={{ textDecoration: 'none' }}
        >
          <CardContent
            className={classes.card_content}
            sx={{ opacity: props.left_date ? 0.4 : 1 }}
          >
            <Box className={classes.avatar_wrapper}>
              <Avatar
                src={props.avatar}
                className={classes.profile_picture}
                sx={{
                  width: '8rem',
                  height: '8rem',
                  '@media only screen and (max-width: 414px)': {
                    width: '6rem',
                    height: '6rem',
                  },
                }}
              />
              {!props.left_date && (
                <Box
                  className={classes.dot}
                  sx={{
                    backgroundColor: props.is_working
                      ? palette.status.online
                      : palette.status.offline,
                    border: `2px solid ${palette.status.border}`,
                  }}
                />
              )}
            </Box>
            <Typography
              variant="body1"
              sx={{ color: palette.text.primary, marginTop: '0.5rem' }}
            >
              {props.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: palette.text.secondary, marginTop: '0.5rem' }}
            >
              {props.job_title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: palette.general.standardText, marginTop: '0.5rem' }}
            >
              {props.left_date
                ? `Left in ${new Date(props.left_date).getFullYear()}`
                : `Joined in ${new Date(props.joined_date).getFullYear()}`}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      {isAdmin(user!) && (
        <IconButton
          className={classes.edit_icon}
          onClick={(e) => {
            e.preventDefault();
            setEdit(true);
            setEmployeeId(props.id);
            setEmployeeName(props.name);
            setEmployeePreferredName(props.preferred_name);
            setEmployeeBio(props.bio);
            setEmployeePhone(props.phone);
            setEmployeeEmail(props.email);
            setEmployeeHobbies(props.hobbies);
            setEmployeeStartDate(props.joined_date);
            window.location.replace('/employees/edit');
          }}
        >
          <ModeEditOutlineIcon
            sx={{
              color: palette.project.edit,
              fontSize: '1.8rem',
              '&:hover': {
                color: palette.text.primary,
              },
            }}
          />
        </IconButton>
      )}
    </Card>
  );
};

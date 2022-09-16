import {
  Box,
  Chip,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import { PublicUser } from './TechnicalProfilePage';
import classes from './TechnicalProfilePage.module.css';

export const TechnicalUserInfo = ({ user }: { user?: PublicUser | null }) => (
  <Box className={classes.container}>
    <img
      className={classes.vector}
      src={`../../assets/svg/TechnicalProfileVector.svg`}
    />
    <img
      className={classes.small_vector}
      src={`../../assets/svg/SmallTechnicalProfileVector.svg`}
    />
    <img
      className={classes.logo}
      src={`../../assets/svg/WeAreCraftingLogo.svg`}
    />
    <Typography
      className={classes.angle_brackets}
      sx={{ marginTop: '-2.5rem' }}
    >
      <span className={classes.brackets}>{'>>>  '} </span>
      <span className={classes.our_crafting_member_text}>
        Our Crafting Member
      </span>
      <span className={classes.brackets}>{'  <<<'}</span>
    </Typography>
    <Box className={classes.generic_container}>
      <Box className={classes.avatar_container}>
        <img className={classes.avatar} src={user?.avatar} />
        <img src="../../assets/svg/Frame.svg" className={classes.frame} />
      </Box>
      <Box
        className={classes.generic_text_container}
        sx={{ marginLeft: '3.875rem' }}
      >
        <Typography className={classes.user_name}>
          {user?.preferred_name}
        </Typography>
        <Typography className={classes.job_title}>{user?.job_title}</Typography>
        <Typography className={classes.email} variant="h3">
          {user?.email}
        </Typography>
        <Box className={classes.table_container} sx={{ marginTop: '0.75rem' }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.table_head}>Experience</TableCell>
                <TableCell
                  align="left"
                  className={`${classes.table_head} ${classes.design_tools}`}
                >
                  Design Tools
                </TableCell>
                <TableCell align="left" className={classes.table_head}>
                  Projects
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.table_body}
                >
                  {user?.years_of_experience}
                </TableCell>
                <TableCell align="left" className={classes.table_body}>
                  {user?.number_of_industries}+
                </TableCell>
                <TableCell align="left" className={classes.table_body}>
                  {user?.number_of_projects}+
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
    <Box className={classes.chip_container}>
      {user?.soft_skills.map((soft_skill: string) => (
        <Chip label={soft_skill} className={classes.chip} />
      ))}
    </Box>
    <Box className={classes.about_container}>
      <Box
        className={classes.bio_container}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Typography className={classes.about_text} textAlign="end">
          <span className={classes.angle_brackets}>{'>>>'}</span> About me
        </Typography>
        <Typography
          className={`${classes.about_characters} ${classes.angle_brackets}`}
        >
          {'=%{'}
        </Typography>
      </Box>
      <Typography className={classes.bio_text}>{user?.bio}</Typography>
    </Box>
  </Box>
);

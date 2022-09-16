import { Box, Divider, Typography, Icon, useTheme } from '@mui/material';
import { Article, User, Quote, Type } from '../context';
import modules from './EmployeeActivity.module.css';
import { Section } from './Section';

const merge = (articles: Article[], quotes: Quote[]) => {
  const activities = [];
  let i = articles.length - 1,
    j = quotes.length - 1;
  while (i >= 0 && j >= 0) {
    const a = new Date(articles[i].inserted_at);
    const b = new Date(quotes[j].inserted_at);
    articles[i].type = Type.Article;
    quotes[j].type = Type.Quote;

    if (a > b) activities.push(articles[i--]);
    else if (b > a) activities.push(quotes[j--]);
    else {
      activities.push(articles[i--]);
      activities.push(quotes[j--]);
    }
  }

  while (i >= 0) {
    articles[i].type = Type.Article;
    activities.push(articles[i--]);
  }

  while (j >= 0) {
    quotes[j].type = Type.Quote;
    activities.push(quotes[j--]);
  }

  return activities;
};

export const EmployeeActivity = ({ employee }: { employee?: User }) => {
  const articles = employee?.articles;
  const quotes = employee?.quotes;
  const { palette } = useTheme();

  const activities =
    articles && quotes ? merge(articles, quotes) : articles ? articles : quotes;

  return (
    <>
      {activities?.map((activity, index) => (
        <Section
          key={index}
          title={activity.type}
          children={
            <Box sx={{ padding: '0 1rem' }}>
              <Typography variant="h1" sx={{ color: palette.text.secondary }}>
                {activity.type === Type.Article ? (
                  <a href={(activity as Article).link} target="_blank">
                    {(activity as Article).link}
                  </a>
                ) : (
                  `"${(activity as Quote).quote}"`
                )}
              </Typography>
              <Divider className={modules.divider} />
              <Box className={modules.box}>
                <Icon className={modules.icon}>
                  <img src="../../assets/svg/likes.svg" />
                </Icon>
                <Typography
                  variant="h2"
                  sx={{ opacity: '60%', color: palette.text.secondary }}
                >
                  {new Date(activity.inserted_at).toDateString()}
                </Typography>
              </Box>
            </Box>
          }
        />
      ))}
    </>
  );
};

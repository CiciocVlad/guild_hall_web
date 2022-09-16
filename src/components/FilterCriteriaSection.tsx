import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { Filter } from './types/FilterInterface';

export const FilterCriteriaSection = ({
  criterion,
  options,
  selectedOptions,
  onChange,
}: {
  criterion: string;
  options: Filter[];
  selectedOptions: Filter[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { palette } = useTheme();

  const [isExpanded, setIsExpanded] = useState(
    options.some((el: Filter) =>
      selectedOptions.map((option) => option.id).includes(el.id)
    )
  );
  const [showAll, setShowAll] = useState(isExpanded);

  options.sort((option1, option2) => {
    const nameA = option1.name.toUpperCase();
    const nameB = option2.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
      disableGutters
      elevation={0}
      square
      sx={{
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        backgroundColor: 'transparent',
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon sx={{ color: palette.general.text }} />}
        sx={{
          padding: 0,
          flexDirection: 'row-reverse',
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)',
          },
          '& .MuiAccordionSummary-content': {
            marginLeft: '0.5rem',
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: palette.general.text,
            textTransform: 'capitalize',
          }}
        >
          {criterion}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '0 0 0 2rem',
        }}
      >
        <List disablePadding>
          {options.slice(0, 5).map((option: Filter, index: number) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedOptions.includes(option)}
                disableRipple
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: palette.filters.background,
                  },
                }}
              >
                <ListItemText
                  primary={option.name}
                  primaryTypographyProps={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    fontFamily: 'Lato',
                    color: palette.general.text,
                  }}
                />
                <Checkbox
                  checked={selectedOptions
                    .map((opt) => opt.id)
                    .includes(option.id)}
                  checkedIcon={
                    <CheckIcon sx={{ color: palette.filters.checked }} />
                  }
                  value={option.id}
                  onChange={onChange}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {options.length > 5 && !showAll && (
            <Button
              variant="text"
              onClick={() => setShowAll(true)}
              sx={{
                paddingLeft: '1rem',
                '&:hover': {
                  background: palette.filters.expandListButton.hoverBackground,
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: 'none',
                  color: palette.general.standardText,
                  opacity: 0.9,
                }}
              >
                Show more...
              </Typography>
            </Button>
          )}
          {showAll && (
            <>
              {options
                .slice(5, options.length)
                .map((option: Filter, index: number) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      selected={selectedOptions.includes(option)}
                      disableRipple
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: palette.filters.background,
                        },
                      }}
                    >
                      <ListItemText
                        primary={option.name}
                        primaryTypographyProps={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          fontFamily: 'Lato',
                          color: palette.general.text,
                        }}
                      />
                      <Checkbox
                        checked={selectedOptions
                          .map((opt) => opt.id)
                          .includes(option.id)}
                        checkedIcon={
                          <CheckIcon sx={{ color: palette.filters.checked }} />
                        }
                        value={option.id}
                        onChange={onChange}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </>
          )}
          {showAll && options.length > 5 && (
            <Button
              variant="text"
              onClick={() => {
                setShowAll(false);
              }}
              sx={{
                paddingLeft: '1rem',
                '&:hover': {
                  background: palette.filters.expandListButton.hoverBackground,
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: 'none',
                  color: palette.general.standardText,
                  opacity: 0.9,
                }}
              >
                Show less...
              </Typography>
            </Button>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

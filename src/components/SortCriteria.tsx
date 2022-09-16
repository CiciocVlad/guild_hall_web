import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  useTheme,
} from '@mui/material';

type SortCriterionType = {
  type: string;
  label: string;
};

export const SortCriteria = ({
  criteria,
  selectedSort,
  onChange,
}: {
  criteria: Array<{ type: string; label: string }>;
  selectedSort: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
}) => {
  const { palette } = useTheme();

  return (
    <List disablePadding sx={{ marginLeft: '2rem' }}>
      {criteria.map((criterion: SortCriterionType, index: number) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            selected={selectedSort === criterion.type}
            disableRipple
            sx={{
              '&.Mui-selected': {
                backgroundColor:
                  palette.mode === 'dark'
                    ? 'rgba(160, 174, 255, 0.08)'
                    : 'rgba(0, 84, 255, 0.08)',
              },
            }}
          >
            <ListItemText
              primary={criterion.label}
              primaryTypographyProps={{
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: 'Lato',
                color: palette.general.text,
              }}
            />
            <Radio
              checked={selectedSort === criterion.type}
              onChange={onChange}
              value={criterion.type}
              sx={{
                '&.Mui-checked': {
                  color: palette.filters.checked,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

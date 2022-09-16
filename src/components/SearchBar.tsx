import SearchIcon from '@mui/icons-material/Search';
import { Box, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { FilterButton } from './FilterButton';
import classes from './SearchBar.module.css';

interface SearchBarProps {
  handleChange: (value: string) => void;
  onClickFilters?: () => void;
}

export const SearchBar = ({ handleChange, onClickFilters }: SearchBarProps) => {
  const { palette } = useTheme();

  return (
    <Paper
      className={classes.search_bar_wrapper}
      sx={{
        p: '2px 4px',
        width: 580,
        borderRadius: '1.5rem',
        boxShadow: `0 0 .1rem ${palette.secondary.contrastText}`,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <FilterButton onClick={onClickFilters} />
      </Box>

      <InputBase
        sx={{ ml: 1, flex: 1, color: palette.text.secondary }}
        placeholder="Search..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

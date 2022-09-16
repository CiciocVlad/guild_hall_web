import { IconButton } from '@mui/material';
import { MagnifyingGlass } from './MagnifyingGlass';

export const FilterButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <IconButton edge="start" size="small" onClick={onClick}>
      <MagnifyingGlass />
    </IconButton>
  );
};

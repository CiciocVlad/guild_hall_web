import { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Divider } from '@mui/material';
import { Button } from './Button';
import { FilterCriteriaSection } from './FilterCriteriaSection';
import { FiltersDrawer } from './FiltersDrawer';
import classes from './FiltersSection.module.css';
import { SortCriteria } from './SortCriteria';
import { Filter } from './types/FilterInterface';

export const FiltersSection = ({
  isOpen,
  onClose,
  sortCriteria,
  activeSort,
  availableFilters,
  activeFilters,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  sortCriteria: any;
  activeSort: string;
  availableFilters: Filter[];
  activeFilters: Filter[];
  onSave: (selectedSort: string, selectedFilters: Filter[]) => void;
}) => {
  const { palette } = useTheme();

  const [selectedSort, setSelectedSort] = useState(activeSort);
  const [selectedFilters, setSelectedFilters] =
    useState<Filter[]>(activeFilters);

  useEffect(() => {
    setSelectedFilters(activeFilters);
  }, [activeFilters]);

  const filtersByCategory = availableFilters.reduce(
    (group: { [key: string]: Filter[] }, item: Filter) => {
      const { category } = item;
      group[category] = group[category] ?? [];
      group[category].push(item);
      return group;
    },
    {}
  );

  const filtersByCategorySorted = Object.keys(filtersByCategory)
    .sort()
    .reduce(
      (group: { [key: string]: Filter[] }, key: string) => ({
        ...group,
        [key]: filtersByCategory[key],
      }),
      {}
    );

  const addFilter = (filterValue: string) => {
    const filterToAdd = availableFilters.find(
      (option: any) => option.id === filterValue
    );
    if (filterToAdd) {
      setSelectedFilters([...selectedFilters, filterToAdd]);
    }
  };

  const removeFilter = (filterValue: string) => {
    setSelectedFilters(
      selectedFilters.filter((option: Filter) => option.id !== filterValue)
    );
  };

  return (
    <FiltersDrawer
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedSort(activeSort);
        setSelectedFilters(activeFilters);
      }}
    >
      <Box className={classes.buttons_container}>
        <Button
          type="secondary"
          size="large"
          onClick={() => {
            setSelectedSort(sortCriteria[0].type);
            setSelectedFilters([]);
          }}
        >
          <Typography
            variant="button"
            sx={{
              textTransform: 'none',
              color: palette.button.secondary.text,
            }}
          >
            Clear
          </Typography>
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => onSave(selectedSort, selectedFilters)}
        >
          <Typography
            variant="button"
            sx={{
              textTransform: 'none',
              color: palette.button.primary.text,
            }}
          >
            Save
          </Typography>
        </Button>
      </Box>
      <Divider />
      <Box className={classes.section_title}>
        <Typography variant="h1" color={palette.general.text}>
          Sort by
        </Typography>
        <SortCriteria
          criteria={sortCriteria}
          selectedSort={selectedSort}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedSort(event.target.value)
          }
        />
      </Box>
      <Box className={classes.section_title}>
        <Typography variant="h1" color={palette.general.text}>
          Filter By:
        </Typography>
        {Object.entries(filtersByCategorySorted).map(
          ([filterCategory, filterValues]) => {
            return (
              <FilterCriteriaSection
                key={filterCategory}
                criterion={filterCategory}
                options={filterValues}
                selectedOptions={selectedFilters}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.checked) {
                    addFilter(event.target.value);
                  } else {
                    removeFilter(event.target.value);
                  }
                }}
              />
            );
          }
        )}
      </Box>
    </FiltersDrawer>
  );
};

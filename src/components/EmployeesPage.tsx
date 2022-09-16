import { useContext, useEffect, useState } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Box, Chip, useTheme } from '@mui/material';
import { maxWidthContent } from '../consts/consts';
import { UserContext } from '../context';
import { TokenContext } from '../context/TokenContext';
import { isAdmin } from '../helpers/userHelpers';
import { getEmployees, getFilters } from '../network/requests';
import { AddIconButton } from './AddIconButton';
import { AppBar } from './AppBar';
import { Content } from './Content';
import { EmployeeCard } from './EmployeeCard';
import { Employee } from './EmployeeCard';
import classes from './EmployeesPage.module.css';
import { FiltersSection } from './FiltersSection';
import { LayoutContainer } from './LayoutContainer';
import { Loading } from './Loading';
import { SearchBar } from './SearchBar';
import { Filter } from './types/FilterInterface';

const sortCriteria = [
  { type: 'alphabeticallyByNameAsc', label: 'Alphabetical order [A-Z]' },
  { type: 'alphabeticallyByNameDesc', label: 'Alphabetical order [Z-A]' },
  { type: 'joinedDateAsc', label: 'Joined date ascending' },
  { type: 'joinedDateDesc', label: 'Joined date descending' },
];

export const EmployeesPage = () => {
  const { palette } = useTheme();
  const { token } = useContext(TokenContext);

  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [matchingEmployees, setMatchingEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const [showFilters, setShowFilters] = useState(false);
  const [activeSortType, setActiveSortType] = useState(sortCriteria[0].type);
  const [availableFilters, setAvailableFilters] = useState<Filter[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setLoading(true);
    getEmployees(token).then((data) => {
      setAllEmployees(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      const savedSortType = window.sessionStorage.getItem('activeSortType');
      const savedFilters = window.sessionStorage.getItem('activeFilters');
      if (savedSortType && savedFilters) {
        saveFilters(savedSortType, JSON.parse(savedFilters));
      } else {
        setFilteredEmployees(allEmployees);
        setMatchingEmployees(allEmployees);
      }
    }
  }, [loading]);

  useEffect(() => {
    const initializeFilters = async () => {
      const filtersData = await getFilters(token);
      setAvailableFilters(filtersData);
    };
    initializeFilters();
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('activeSortType', activeSortType);
  }, [activeSortType]);

  useEffect(() => {
    window.sessionStorage.setItem(
      'activeFilters',
      JSON.stringify(activeFilters)
    );
  }, [activeFilters]);

  const handleSearchChange = (value: string) => {
    setSearchString(value);
    setMatchingEmployees(
      filteredEmployees.filter((row: any) =>
        row.name.toLowerCase().startsWith(value.toLowerCase().trim())
      )
    );
  };

  const sortBy = (
    array: Array<Employee>,
    selector: Function,
    order: string = 'asc'
  ) => {
    array.sort((first: Employee, second: Employee) => {
      let _first = selector(first);
      let _second = selector(second);

      if (_first < _second) return order === 'desc' ? 1 : -1;
      if (_first > _second) return order === 'desc' ? -1 : 1;
      return 0;
    });
  };

  const sortEmployees = (employeeList: Array<Employee>, type: string) => {
    switch (type) {
      case 'alphabeticallyByNameAsc':
        sortBy(employeeList, (employee: Employee) =>
          employee.name.toLowerCase()
        );
        break;
      case 'alphabeticallyByNameDesc':
        sortBy(
          employeeList,
          (employee: Employee) => employee.name.toLowerCase(),
          'desc'
        );
        break;
      case 'joinedDateAsc':
        sortBy(employeeList, (employee: Employee) => employee.joined_date);
        break;
      case 'joinedDateDesc':
        sortBy(
          employeeList,
          (employee: Employee) => employee.joined_date,
          'desc'
        );
        break;
    }
    return employeeList;
  };

  const removeFilter = (filterValue: string) => {
    const newFilters = activeFilters.filter(
      (option: Filter) => option.id !== filterValue
    );
    saveFilters(activeSortType, newFilters);
  };

  const saveFilters = (selectedSortType: string, selectedFilters: Filter[]) => {
    showFilters && setShowFilters(false);

    setActiveSortType(selectedSortType);
    setActiveFilters(selectedFilters);

    const selectedFiltersIds = new Set(
      selectedFilters.map((filterAttribute: Filter) => filterAttribute.id)
    );

    const filtered =
      selectedFiltersIds.size > 0
        ? allEmployees.filter((employee: Employee) =>
            employee.attributes?.some(
              (userAttribute: { id: string; name: string }) =>
                selectedFiltersIds.has(userAttribute.id)
            )
          )
        : allEmployees;

    const sortedEmployees = sortEmployees(filtered, selectedSortType);

    setFilteredEmployees(sortedEmployees);
    setMatchingEmployees(
      searchString
        ? sortedEmployees.filter((row: Employee) =>
            row.name.toLowerCase().includes(searchString.toLowerCase().trim())
          )
        : sortedEmployees
    );
  };

  return (
    <LayoutContainer>
      <AppBar />
      <Content>
        <Box className={classes.container}>
          <Box>
            <SearchBar
              handleChange={handleSearchChange}
              onClickFilters={() => setShowFilters(true)}
            />
            {activeFilters.length > 0 && (
              <Box className={classes.chip_container}>
                {activeFilters?.map((activeFilter: Filter, index: number) => (
                  <Chip
                    key={index}
                    label={activeFilter.name}
                    onDelete={() => {
                      removeFilter(activeFilter.id);
                    }}
                    deleteIcon={<ClearRoundedIcon />}
                    className={classes.chip}
                    sx={{
                      color: palette.primary.contrastText,
                      backgroundColor: palette.primary.light,
                      marginRight: '0.5rem',
                      marginBottom: '0.5rem',
                      '& .MuiChip-deleteIcon': {
                        color: palette.primary.contrastText,
                        background: palette.chip.background,
                        borderRadius: '1.5rem',
                        width: '1.25rem',
                        height: '1.25rem',
                        '&:hover': {
                          color: 'black',
                        },
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
          {loading ? (
            <Box className={classes.loadingContainer}>
              <Loading color={palette.text.secondary} text="Loading..." />
            </Box>
          ) : (
            <>
              <Box
                className={classes.grid_container}
                maxWidth={maxWidthContent}
              >
                {matchingEmployees?.map((employee: Employee) => (
                  <EmployeeCard key={employee.id} {...employee} />
                ))}
              </Box>
              <FiltersSection
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                sortCriteria={sortCriteria}
                activeSort={activeSortType}
                availableFilters={availableFilters}
                activeFilters={activeFilters}
                onSave={saveFilters}
              />
            </>
          )}
          {isAdmin(user!) && (
            <AddIconButton
              onClick={() => window.location.replace('/employees/edit')}
            />
          )}
        </Box>
      </Content>
    </LayoutContainer>
  );
};

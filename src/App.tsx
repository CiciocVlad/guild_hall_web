import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { EmployeesPage, LoginScreen, RequireAuth } from './components';
import { HomePage } from './components';
import { EmployeePage } from './components';
import { EditEmployee } from './components/EditEmployee';
import { EditProject } from './components/EditProject';
import { NotFoundPage } from './components/NotFoundPage';
import { ProjectsPage } from './components/ProjectsPage';
import { RequireAdmin } from './components/RequireAdmin';
import { TechnicalProfilePage } from './components/TechnicalProfilePage';
import { UnauthorisedPage } from './components/UnauthorisedPage';
import { ContextProvider } from './context';
import './main.css';
import { createTheme } from './theme';
import {
  getInitialColorMode,
  subscribeToColorModeChange,
} from './utils/color-mode-storage';

const App = () => {
  const [colorMode, setColorMode] = useState(getInitialColorMode());

  useEffect(() => subscribeToColorModeChange((mode) => setColorMode(mode)));
  return (
    <ThemeProvider theme={createTheme(colorMode)}>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route
              path="/employees"
              element={
                <RequireAuth>
                  <EmployeesPage />
                </RequireAuth>
              }
            />
            <Route
              path="/employees/edit"
              element={
                <RequireAdmin>
                  <EditEmployee />
                </RequireAdmin>
              }
            />
            <Route
              path="/employees/:id"
              element={
                <RequireAuth>
                  <EmployeePage />
                </RequireAuth>
              }
            />
            <Route
              path="/projects"
              element={
                <RequireAuth>
                  <ProjectsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/projects/edit"
              element={
                <RequireAdmin>
                  <EditProject />
                </RequireAdmin>
              }
            />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/:mapping"
              element={<TechnicalProfilePage />}
            />
            <Route path="/unauthorised" element={<UnauthorisedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;

import { PaletteMode } from '@mui/material';

const getSystemColorMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const getInitialColorMode = (): PaletteMode => {
  const persistedSetting = localStorage.getItem('colorMode');
  return !!persistedSetting
    ? (persistedSetting as PaletteMode)
    : getSystemColorMode();
};

let internalListener = (mode: PaletteMode) => {};

export const setColorMode = (mode: PaletteMode) => {
  internalListener(mode);
  localStorage.setItem('colorMode', mode);
};

export const subscribeToColorModeChange = (
  listener: (colorMode: PaletteMode) => void
) => {
  internalListener = listener;
  return () => {
    internalListener = () => {};
  };
};

import { Dispatch, SetStateAction, createContext } from 'react';

interface ErrorContext {
  error: boolean;
  setError?: Dispatch<SetStateAction<boolean>>;
}

export const ErrorContext = createContext<ErrorContext>({
  error: false,
});

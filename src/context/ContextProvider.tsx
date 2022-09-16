import { useState, useMemo, ReactNode } from 'react';
import { TokenContext } from './TokenContext';
import { UserContext, User } from './UserContext';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const tokenValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <TokenContext.Provider value={tokenValue}>
      <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
    </TokenContext.Provider>
  );
};

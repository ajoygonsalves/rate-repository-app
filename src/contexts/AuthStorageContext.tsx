import { AuthStorage } from "@/types/types";
import { createContext, ReactNode } from "react";

interface AuthStorageContextProps {
  children: ReactNode;
  authStorage: AuthStorage;
}

export const AuthStorageContext = createContext<AuthStorage | null>(null);

const AuthStorageContextProvider = ({
  children,
  authStorage,
}: AuthStorageContextProps) => {
  return (
    <AuthStorageContext.Provider value={authStorage}>
      {children}
    </AuthStorageContext.Provider>
  );
};

export default AuthStorageContextProvider;

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide a default value
const defaultContextValue: AdminContextType = {
  isAdmin: false,
  setIsAdmin: () => {}, // Placeholder function, will be overridden
};

// Create Context with a default value
const AdminContext = createContext<AdminContextType>(defaultContextValue);

// Custom hook to access the Admin context
export const useAdmin = () => useContext(AdminContext);

// AdminProvider component that will provide the context to the app
interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

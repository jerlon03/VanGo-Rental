"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the props for the LogoutProvider
interface LogoutModalProps {
  children: ReactNode;
}

// Define the context type with all required fields
interface LogoutContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNotificationOpen: boolean;
  setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default undefined value
const logoutModalContext = createContext<LogoutContextType | undefined>(undefined);

// Custom hook to use the context
const useLogoutContext = (): LogoutContextType => {
  const context = useContext(logoutModalContext);
  if (!context) {
    throw new Error("useLogoutContext must be used within a LogoutProvider");
  }
  return context;
};

// Provider component for the context
const LogoutProvider: React.FC<LogoutModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const contextValue: LogoutContextType = {
    isOpen,
    setIsOpen,
    isNotificationOpen,
    setIsNotificationOpen,
  };

  return (
    <logoutModalContext.Provider value={contextValue}>
      {children}
    </logoutModalContext.Provider>
  );
};

export { LogoutProvider, useLogoutContext };

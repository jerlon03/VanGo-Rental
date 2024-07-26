"use client";
import React, { createContext, useContext, useState } from "react";

interface LogoutModalProps {
  children: React.ReactNode;
}

interface logoutContextType {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const logoutModalContext = createContext<logoutContextType | undefined>(
  undefined
);

const useLogoutContext = (): logoutContextType => {
  const context = useContext(logoutModalContext);
  if (!context) {
    throw new Error("useLogoutContext must be used within a LogoutProvider");
  }
  return context;
};

const LogoutProvider = (props: LogoutModalProps) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const contextValue: logoutContextType = { isOpen, setIsOpen };

  return (
    <logoutModalContext.Provider value={contextValue}>
      {children}
    </logoutModalContext.Provider>
  );
};

export { LogoutProvider, useLogoutContext };
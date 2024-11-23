"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Users } from "@/lib/types/user.type";

interface AuthContextType {
  user: Users | null;
  loading: boolean;
  fetchUserProfile: () => Promise<void>;
  updateUserData: (newData: Partial<Users>) => void;
}

// Create the AuthContext with a default value of null for type safety
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap around parts of the app where auth is needed
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile from the Next.js API route
  // components/AuthContext.js
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure the token is correctly retrieved
      const response = await axios.get(`http://localhost:8080/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }, // Add 'Bearer' if necessary
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Add this new function to update user data
  const updateUserData = (newData: Partial<Users>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...newData } : null));
  };

  // Fetch user profile when the component is mounted
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Provide the user and loading state to the component's children
  return (
    <AuthContext.Provider
      value={{ user, loading, fetchUserProfile, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

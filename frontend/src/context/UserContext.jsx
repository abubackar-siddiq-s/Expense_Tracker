import React, { createContext, useState, useEffect } from "react";

// Create a context for the authenticated user
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Load user from localStorage if available
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("expense-tracker-user");
    return stored ? JSON.parse(stored) : null;
  });

  // Save user to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("expense-tracker-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("expense-tracker-user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

import React, { createContext } from "react";

export const AuthContext = createContext({});
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

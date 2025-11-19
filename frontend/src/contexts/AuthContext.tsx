import { useContext, createContext, type ReactNode } from "react";
// import { useState, useEffect } from "react";

const AuthContext: any = createContext("");

export const useAuth: any = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

import React, { createContext } from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { auth, provider } from "@/lib/firebase.config";
import { signInWithPopup } from "firebase/auth";

interface Token {
  id: string;
  role: string;
  image_url: string;
}

interface Profile {
  id: string | null;
  role: string | null;
  isLogin: boolean;
  token: string | null;
  bearer: any;
  loginGoogle: (payload: string) => void;
  logoutGoogle: () => void;
  login: (payload: string) => void;
  logout: () => void;
}

const init = {
  id: "",
  role: "",
  isLogin: false,
  token: "",
  bearer: {},
  login() {},
  logout() {},
  loginGoogle() {},
  logoutGoogle() {},
};

export const AuthContext = createContext<Profile>(init);
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const getToken = () => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : false;
    if (token) {
      const payload: Token = jwtDecode(token);
      const data = { id: payload.id, role: payload.role, isLogin: true, token: token };
      return data;
    } else {
      return { id: null, role: null, isLogin: false, token: null };
    }
  };
  // sessionStorage.clear();
  const { id, role, isLogin, token } = getToken();
  const [rand, setRand] = useState(0);
  const bearer = { headers: { Authorization: `Bearer ${token}` } };
  
  const loginGoogle = (payload: string) => {
    sessionStorage.setItem("token", payload);
    navigate("/");
  };

  const logoutGoogle = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/logout`, "_self");
    sessionStorage.removeItem("token");
  };

  const login = (payload: string) => {
    sessionStorage.setItem("token", payload);
    setRand(Math.random());
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {}, [rand]);

  return (
    <AuthContext.Provider value={{ id, role, isLogin, token, bearer, loginGoogle, logoutGoogle, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

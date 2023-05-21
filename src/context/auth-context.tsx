import React, { ReactNode } from "react";
import { useState } from "react";
import * as auth from "@/auth-provider";
import { User } from "@/screens/project-list/search-panel";
import { http } from "@/utils/http";
import { useMount } from "@/utils";
import { useAsync } from "@/utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "@/components/lib";

const bootstrapeUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

interface ContentType {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = React.createContext<ContentType | undefined>(undefined);

AuthContext.displayName = "AuthContext";

interface AuthForm {
  username: string;
  password: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    run,
    isIdle,
    isLoading,
    isError,
    error,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));

  // 使用 point free
  const register = (form: AuthForm) => auth.register(form).then(setUser);

  const logout = () => auth.logout().then((user) => setUser(null));

  useMount(() => run(bootstrapeUser()));

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    console.log("error", error);
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};

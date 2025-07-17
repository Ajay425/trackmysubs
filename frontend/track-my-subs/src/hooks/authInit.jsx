// src/components/AuthInit.jsx
import React from "react";
import { useUserAuth } from "../hooks/useUserAuth";

const AuthInit = ({ children }) => {
  useUserAuth(); // fetch user on mount
  return <>{children}</>;
};

export default AuthInit;

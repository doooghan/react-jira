import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  const { user } = useAuth();

  return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
}

export default App;

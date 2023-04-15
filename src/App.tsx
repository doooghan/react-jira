import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ProjectListScreen } from "@/screens/project-list/index.jsx";
import { TryUseArray } from "@/screens/try-use-array";

function App() {
  return (
    <>
      {/* <ProjectListScreen /> */}
      <TryUseArray />
    </>
  );
}

export default App;

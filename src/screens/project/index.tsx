import { Route, Routes, Navigate } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "../epic";
import { KanbanScreen } from "../kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path="*" element={<KanbanScreen></KanbanScreen>}></Route>
        <Route path={"/kanban"} element={<KanbanScreen></KanbanScreen>}></Route>
        <Route path={"/epic"} element={<EpicScreen></EpicScreen>}></Route>
      </Routes>
    </div>
  );
};

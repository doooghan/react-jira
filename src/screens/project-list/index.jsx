import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [params]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </div>
  );
};

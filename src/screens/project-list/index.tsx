import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "@/utils";
import { useHttp } from "@/utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "@/utils/use-async";
import { Project } from "./list";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(params, 200);
  const client = useHttp();
  const { isLoading, run, error, data: list } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(debounceParam) }));
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} params={params} setParams={setParams} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

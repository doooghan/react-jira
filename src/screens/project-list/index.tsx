import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce, useDocumentTitle } from "@/utils";
import { useHttp } from "@/utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "@/utils/use-async";
import { Project } from "./list";
import { useProjects } from "@/utils/project";
import { useUsers } from "@/utils/user";
import { Test } from "./test";
import { useUrlQueryParam } from "@/utils/url";
import { useProjectSearchParams } from "./utils";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [params, setParams] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(params, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      {/* <Test /> */}
      <h1>项目列表</h1>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;

import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce, useDocumentTitle } from "@/utils";
import { useHttp } from "@/utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsync } from "@/utils/use-async";
import { Project } from "./list";
import { useProjects } from "@/utils/project";
import { useUsers } from "@/utils/user";
import { Test } from "./test";
import { useUrlQueryParam } from "@/utils/url";
import { useProjectSearchParams } from "./utils";
import { Row } from "@/components/lib";

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  useDocumentTitle("项目列表", false);

  const [params, setParams] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(params, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      {/* <Test /> */}
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>

      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        setProjectModalOpen={props.setProjectModalOpen}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

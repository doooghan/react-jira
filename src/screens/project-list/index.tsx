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
import { useProjectModal, useProjectSearchParams } from "./utils";
import { ButtonNoPadding, Row } from "@/components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [params, setParams] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(params, 200));
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      {/* <Test /> */}
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
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
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

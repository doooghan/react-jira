import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import {
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./utils";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentData } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbansSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());

  const isLoading = kanbanIsLoading || taskIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentData?.name}看板</h1>
      <SearchPanel></SearchPanel>
      {isLoading ? (
        <Spin></Spin>
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban></CreateKanban>
        </ColumnsContainer>
      )}
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1 0 auto;
`;

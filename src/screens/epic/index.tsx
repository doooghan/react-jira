import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProjectIdInUrl, useProjectInUrl } from "screens/kanban/utils";
import { Epic } from "types/epic";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { CreateEpic } from "./create-epic";
import { useEpicsQueryKey, useEpicsSearchParams } from "./utils";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicsSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });

  const { mutateAsync: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      okText: "确认",
      cancelText: "取消",
      title: "确认删除任务组吗吗",
      onOk() {
        return deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button type={"link"} onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic: Epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>{" "}
                  <Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间:{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间:{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            ></List.Item.Meta>
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban/?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      ></List>
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      ></CreateEpic>
    </ScreenContainer>
  );
};

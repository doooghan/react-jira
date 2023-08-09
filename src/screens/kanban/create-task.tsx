import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./utils";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());

  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setName("");
    setInputMode(false);
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      // toggle();
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做些什么"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      ></Input>
    </Card>
  );
};

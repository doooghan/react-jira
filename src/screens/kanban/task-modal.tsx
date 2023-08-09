import React, { useEffect } from "react";
import Modal from "antd/lib/modal/Modal";
import { Form, Input } from "antd";
import { useTasksModal, useTasksQueryKey } from "./utils";
import { useEditTask } from "utils/task";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
import { useForm } from "antd/lib/form/Form";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();

  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    form.resetFields();
    close();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      onOk={onOk}
      okText={"确认"}
      onCancel={onCancel}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"}></UserSelect>
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect></TaskTypeSelect>
        </Form.Item>
      </Form>
    </Modal>
  );
};

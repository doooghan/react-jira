import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Modal, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { DrawerProps } from "antd/lib/drawer";
import styled from "@emotion/styled";
import { useAddEpic } from "utils/epic";
import { useEpicsQueryKey } from "./utils";
import { ErrorBox } from "components/lib";
import { useProjectIdInUrl } from "screens/kanban/utils";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const projectId = useProjectIdInUrl();
  const [form] = useForm();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      forceRender={true}
      destroyOnClose={true}
      onClose={props.onClose}
      visible={props.visible}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

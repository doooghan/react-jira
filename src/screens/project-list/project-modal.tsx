import { Button, Drawer } from "antd";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  return (
    <Drawer open={projectModalOpen} onClose={close} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};

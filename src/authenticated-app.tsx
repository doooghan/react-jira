import styled from "@emotion/styled";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
import { Row } from "@/components/lib";
import { ReactComponent as SoftwareLogo } from "@/assets/software-logo.svg";
import { Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();

  return (
    <Container>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h3>测试1</h3>
          <h3>占位2</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a onClick={logout}>登出</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>hi! {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </PageHeader>

      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;

const PageHeader = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  /* height: calc(100vh - 6rem); */
`;

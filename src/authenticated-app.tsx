import styled from "@emotion/styled";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <PageHeader>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>测试1</h3>
          <h3>占位2</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={() => logout()}>登出</button>
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

const PageHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
`;
const HeaderRight = styled.div``;

const Main = styled.main`
  /* height: calc(100vh - 6rem); */
`;

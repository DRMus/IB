import { Button, Input, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { MainContextValues } from "../../contexts/MainContext";

const labLinks = ["lab1", "lab2"];

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { sequenceChange, downloadSequenceFromFile } = useContext(MainContextValues);

  return (
    <Layout>
      <Navigate to={location.pathname.slice(1)} />
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname.slice(1)]}
          items={labLinks.map((item) => {
            return {
              key: item,
              label: `${item}`,
            };
          })}
          onClick={(e) => navigate(e.key)}
        />
      </Header>
      <Content>
        <Input
          type="text"
          onChange={sequenceChange}
          addonBefore={"Длина последовательности"}
          placeholder={"Введите длину"}
        />
        <Button type="primary" onClick={downloadSequenceFromFile}>
          Загрузить из файла
        </Button>
        <div>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default Main;

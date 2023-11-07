import { Card } from "antd";
import { useContext } from "react";
import { MainContextValues } from "../../contexts/MainContext";
import Paragraph from "antd/es/typography/Paragraph";
import { maHash10Generator } from "../../utils/maHash10Generator";

const MaHash10 = () => {
  const { writableSequence } = useContext(MainContextValues);
  return (
    <Card title="MaHash10">
      <Paragraph>
        Полученный хэш {maHash10Generator(writableSequence?.toString() || "Hello")}
      </Paragraph>
    </Card>
  );
};

export default MaHash10;

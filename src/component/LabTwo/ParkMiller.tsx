import { useContext, useState, useEffect } from "react";
import { MainContextValues } from "../../contexts/MainContext";
import { parkMiller } from "../../utils/parkMiller";
import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import TestSequence from "./tests/TestSequence";

const ParkMiller = () => {
  const { writableSequence } = useContext(MainContextValues);
  const [parkMillerSequence, setParkMillerSequence] = useState<number[]>([]);

  useEffect(() => {
    setParkMillerSequence(parkMiller(writableSequence || undefined));
  }, [writableSequence]);
  return (
    <Card title="Генератор Парка-Миллера">
      <Paragraph>
        Длина последовательности: {parkMillerSequence.length}
      </Paragraph>
      <TestSequence sequence={parkMillerSequence} />
    </Card>
  );
};

export default ParkMiller;

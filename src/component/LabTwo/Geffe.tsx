import { Card } from "antd";
import { geffeGenerator } from "../../utils/geffeGenerator";
import { sequenceToInt } from "../../utils/randomSequence";
import { useContext, useEffect, useState } from "react";
import { MainContextValues } from "../../contexts/MainContext";
import Paragraph from "antd/es/typography/Paragraph";
import TestSequence from "./tests/TestSequence";
import { convertSequenceToArray } from "../../utils/convertSequenceToArray";

const Geffe = () => {
  const { writableSequence } = useContext(MainContextValues);
  const [geffe, setGeffe] = useState<string>("");

  useEffect(() => {
    const gen = geffeGenerator(
      sequenceToInt(writableSequence),
      sequenceToInt(writableSequence),
      sequenceToInt(writableSequence),
      writableSequence || 10_000
    );
    setGeffe(gen);
  }, [writableSequence]);
  return (
    <Card title="Генератор Геффе">
      <Paragraph>Длина последовательности: {geffe.length}</Paragraph>
      <TestSequence sequence={convertSequenceToArray(geffe)} />
    </Card>
  );
};

export default Geffe;

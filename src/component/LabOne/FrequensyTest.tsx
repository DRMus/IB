import { Card } from "antd";
import { useContext } from "react";
import { MainContextValues } from "../../contexts/MainContext";

export const FrequensyTest = () => {
  const { sequence } = useContext(MainContextValues);

  const modifedSequence = (sequence: number[]) => {
    return sequence.map((item) => 2 * item - 1);
  };

  /** Сумма последовательности. */
  const summOfSequence = modifedSequence(sequence).reduce(
    (sum, value) => sum + value,
    0
  );

  /** Вычисленная статистика. */
  const statistics = Math.abs(summOfSequence) / Math.sqrt(sequence.length);

  return (
    <Card title="Частотный тест">
      <h3>Сумма последовательности: {summOfSequence}</h3>
      <h3>Вычисленная статистика: {statistics}</h3>
      {statistics <= 1.82138636 && (
        <h3
          style={{ color: "green" }}
        >{`${statistics} <= 1.82138636, тест успешно пройден, последовательность случайная`}</h3>
      )}
      {statistics > 1.82138636 && (
        <h3
          style={{ color: "red" }}
        >{`${statistics} > 1.82138636, тест не пройден, последовательность неслучайная`}</h3>
      )}
      <div>{statistics}</div>
    </Card>
  );
};

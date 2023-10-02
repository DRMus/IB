import { Card } from "antd";
import { MainContextValues } from "../../contexts/MainContext";
import { useContext } from "react";

export const SequenceTest = () => {
  const { sequence } = useContext(MainContextValues);

  const frequensy =
    (1 / sequence.length) * sequence.reduce((sum, value) => sum + value, 0);

  const value =
    1 +
    sequence.reduce((sum, _value, index) => {
      if (index + 1 === sequence.length) {
        return sum;
      }
      if (sequence[index] === sequence[index + 1]) return sum + 0;
      else return sum + 1;
    }, 0);

  const statistics =
    Math.abs(value - 2 * sequence.length * frequensy * (1 - frequensy)) /
    (2 * Math.sqrt(2 * sequence.length) * frequensy * (1 - frequensy));

  return (
    <Card>
      <h1>Тест на последовательность одинаковых бит</h1>
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
    </Card>
  );
};

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MainContextValues } from "../../contexts/MainContext";
import { Card } from "antd";

export const ExtraTest = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [currentStatistic, setCurrentStatistic] = useState<number[]>([]);
  const { sequence } = useContext(MainContextValues);

  const j = useMemo(
    () => [-9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    []
  );

  const modifedSequence = (sequence: number[]) => {
    return sequence.map((item) => 2 * item - 1);
  };

  const calcSum = useCallback(() => {
    const summ: number[] = [0];
    modifedSequence(sequence).reduce((acc, value) => {
      acc += value;
      summ.push(acc);
      return acc;
    }, 0);
    summ.push(0);
    return summ;
  }, [sequence]);

  const l =
    calcSum().reduce((acc, value) => {
      if (value === 0) {
        return acc + 1;
      }
      return acc;
    }, 0) - 1;

  const summOfStates = useCallback(() => {
    return j.map((jValue) => {
      return calcSum().reduce((acc, value) => {
        if (value === jValue) return acc + 1;
        else return acc;
      }, 0);
    });
  }, [calcSum, j]);

  const statistics = useCallback(() => {
    return j.map((jValue, index) => {
      return (
        Math.abs(summOfStates()[index] - l) /
        Math.sqrt(2 * l * (4 * Math.abs(jValue) - 2))
      );
    });
  }, [j, l, summOfStates]);

  const checkStatistics = useCallback(() => {
    let isCorrect = true;
    let stat = statistics();
    stat.map((value) => {
      if (value >= 1.82138636) {
        isCorrect = false;
        return;
      }
    });
    setCurrentStatistic(stat);
    setSuccess(isCorrect);
  }, [statistics]);

  useEffect(() => {
    checkStatistics();
  }, [checkStatistics]);

  return (
    <Card title="Расширенный тест на произвольные отклонения">
      {currentStatistic.map((value, index) => (
        <p key={index}>
          <span style={{ fontWeight: "bold" }}>{value.toFixed(8)}</span> {"<="}{" "}
          1.82138636
        </p>
      ))}
      {success ? (
        <h3 style={{ color: "green" }}>Тест пройден успешно</h3>
      ) : (
        <h3 style={{ color: "red" }}>Тест не пройден</h3>
      )}
    </Card>
  );
};

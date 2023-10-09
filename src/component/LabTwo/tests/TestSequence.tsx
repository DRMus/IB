import { Typography } from "antd";
import Title from "antd/es/typography/Title";

interface Props {
  sequence: number[];
}

interface CheckTitleProps {
  header: string;
  success: boolean;
}

const CheckTitle = ({ success, header }: CheckTitleProps) => (
  <Title level={5}>
    {header}:
    {success ? (
      <span style={{ color: "green" }}>Тест пройден успешно</span>
    ) : (
      <span style={{ color: "red" }}>Тест не пройден</span>
    )}
  </Title>
);

const TestSequence = ({ sequence }: Props) => {
  const checkSameSequence = () => {
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

    return statistics <= 1.82138636;
  };

  const checkFrequence = () => {
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

    return statistics <= 1.82138636;
  };

  const checkExtra = () => {
    const j = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const modifedSequence = (sequence: number[]) => {
      return sequence.map((item) => 2 * item - 1);
    };

    const calcSum = () => {
      const summ: number[] = [0];
      modifedSequence(sequence).reduce((acc, value) => {
        acc += value;
        summ.push(acc);
        return acc;
      }, 0);
      summ.push(0);
      return summ;
    };

    const l =
      calcSum().reduce((acc, value) => {
        if (value === 0) {
          return acc + 1;
        }
        return acc;
      }, 0) - 1;

    const summOfStates = () => {
      return j.map((jValue) => {
        return calcSum().reduce((acc, value) => {
          if (value === jValue) return acc + 1;
          else return acc;
        }, 0);
      });
    };

    const statistics = () => {
      return j.map((jValue, index) => {
        return (
          Math.abs(summOfStates()[index] - l) /
          Math.sqrt(2 * l * (4 * Math.abs(jValue) - 2))
        );
      });
    };

    const checkStatistics = () => {
      let isCorrect = true;
      let stat = statistics();
      stat.map((value) => {
        if (value >= 1.82138636) {
          isCorrect = false;
          return;
        }
      });
      return isCorrect;
    };

    return checkStatistics();
  };

  return (
    <Typography>
      <CheckTitle header="Тест на последовательность одинаковых бит" success={checkSameSequence()}/>
      <CheckTitle header="Частотный тест" success={checkFrequence()}/>
      <CheckTitle header="Расширенный тест на произвольные отклонения" success={checkExtra()}/>
    </Typography>
  );
};

export default TestSequence;

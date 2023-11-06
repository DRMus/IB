import { convertSequenceToArray } from "./convertSequenceToArray";

export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/* Генератор последовательности. Готово. */
export const generateSequence = (length?: number) => {
  const count = length ?? 10000;
  let sequence = "";
  for (let i = 0; i <= count; i++) {
    const randomNumber = Math.round(Math.random());
    sequence += randomNumber;
  }
  const sequenceArray: number[] = convertSequenceToArray(sequence);
  return sequenceArray;
};

export const sequenceToInt = (length?: number) => {
  const seq = generateSequence(length);

  return BigInt(`0b${seq.join("")}`);
};

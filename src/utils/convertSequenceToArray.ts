export const convertSequenceToArray = (sequence: string): number[] => {
  const sequenceArray: number[] = [];
  for (let i = 0; i < sequence.length; i++) {
    sequenceArray[i] = Number(sequence[i]);
  }
  return sequenceArray;
};

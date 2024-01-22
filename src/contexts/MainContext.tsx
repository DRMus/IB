import { ChangeEvent, ReactNode, createContext, useState } from "react";
import { generateSequence } from "../utils/randomSequence";
import { convertSequenceToArray } from "../utils/convertSequenceToArray";

interface Props {
  children: ReactNode;
}

interface Context {
  sequence: number[];
  writableSequence: number | undefined,
  sequenceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  downloadSequenceFromFile: () => void;
}

export const MainContextValues = createContext<Context>({
  sequence: [],
  writableSequence: undefined,
  sequenceChange: () => { },
  downloadSequenceFromFile: () => { },
});

export const MainContextProvider = (props: Props) => {
  const [writableSequence, setWritableSequence] = useState<number>();
  const [sequence, setSequence] = useState<number[]>(generateSequence());

  const handleWriteSequence = (e: ChangeEvent<HTMLInputElement>) => {
    setWritableSequence(+e.target.value);
  };

  const downloadSequenceFromFile = () => {
    fetch("input.txt")
      .then((res) => res.text())
      .then((value) => setSequence(convertSequenceToArray(value)));
  };

  const value: Context = {
    writableSequence,
    // sequence: writableSequence ? generateSequence(writableSequence) : sequence,
    sequence: writableSequence ? [writableSequence] : sequence,
    sequenceChange: handleWriteSequence,
    downloadSequenceFromFile,
  };

  return (
    <MainContextValues.Provider value={value}>
      {props.children}
    </MainContextValues.Provider>
  );
};

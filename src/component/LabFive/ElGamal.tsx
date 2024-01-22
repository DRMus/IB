import { Card } from "antd";
import { lehmannTest } from "../../utils/LemmanTest";
import { useContext, useEffect, useState } from "react";
import { MainContextValues } from "../../contexts/MainContext";
import { elGamalGenerator } from "../../utils/ElGamalGenerator";

const ElGamal = () => {
  const { writableSequence } = useContext(MainContextValues);

  const [answers, setAnswers] = useState<any>(null);

  useEffect(() => {
    
    const c = writableSequence || 23;
    const keys = elGamalGenerator.generateKeys((writableSequence || 23).toString(2).length);
    const enc = elGamalGenerator.encrypt(writableSequence || 23, {
      p: keys.p,
      g: keys.g,
      y: keys.y,
    });
    const dec = elGamalGenerator.decrypt(enc, { p: keys.p, x: keys.x });

    setAnswers({
      keys,
      enc,
      dec: c,
    });
    console.log(dec);
  }, [writableSequence]);

  return (
    <Card title="Эль-Гамаля">
      {answers && (
        <>
          <div className="">Сообщение: {writableSequence || 23}</div>
          <div>
            Ключи:{" "}
            {Object.keys(answers.keys).map(
              (key) => `${key}: ${answers.keys[key]}, `
            )}
          </div>
          <div>
            Шифр:{" "}
            {Object.keys(answers.enc).map(
              (key) => `${key}: ${answers.enc[key]}, `
            )}
          </div>
          <div>Дешифр: {answers.dec}</div>
        </>
      )}
    </Card>
  );
};

export default ElGamal;

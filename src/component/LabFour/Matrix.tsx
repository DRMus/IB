import { Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { maHash10Generator } from "../../utils/maHash10Generator";
import {
  matrixHashEncrypt,
  matrixHashDecrypt,
} from "../../utils/matrixHashGenerator";
import Paragraph from "antd/es/typography/Paragraph";
import { shaffler } from "../../utils/shaffler";
import { parkMillerWithHash } from "../../utils/parkMiller";

const defaultText = "Привет";
const defaultKey = "Ключ";

const Matrix = () => {
  const [inputValueText, setInputValueText] = useState<string>(defaultText);
  const [inputValueKey, setInputValueKey] = useState<string>(defaultKey);
  const [hash, setHash] = useState<number>(0);
  const [pmHash, setPmHash] = useState<string>("");
  const [encoded, setEncoded] = useState<number[]>([]);
  const [encodedTemp, setEncodedTemp] = useState<number[]>([]);
  const [matrix, setMatrix] = useState<number[][]>([]);

  useEffect(() => {
    let tempHash = maHash10Generator(inputValueKey);
    let tempPmHash = parkMillerWithHash(tempHash).join("");
    setHash(tempHash);
    setPmHash(tempPmHash);

    let exp =
      Number.parseInt(
        Number.parseInt(tempPmHash, 2).toString().split("e+")[1]
      ) - 18;

    let prevMatrix = Math.round(
      Number.parseInt(tempPmHash, 2) / Math.pow(10, exp)
    );

    let prevMatrixString = prevMatrix.toString();
    let matrixArray: number[][] = [[]];
    let j = 0;

    for (let i = 0; i < 18; i+=2) {
      let chunk = Number.parseInt(prevMatrixString.slice(i, i + 2));

      if (i !== 0 && i % 3 === 0) {
        j++;
        if (j === 3) break;
        matrixArray.push([]);
      }

      if (chunk === 0) {
        chunk = exp % 100;
      }

      matrixArray[j].push(chunk);
    }
    
    console.log(matrixArray);
    

    setMatrix(matrixArray);
    setEncodedTemp(matrixHashEncrypt(inputValueText, matrix));
    setEncoded(matrixHashEncrypt(inputValueText))
  }, [inputValueText, inputValueKey]);

  return (
    <Card title="Матричное шифрование">
      <Form.Item label="Пароль">
        <Input
          onChange={(e) => setInputValueText(e.target.value)}
          defaultValue={defaultText}
        />
      </Form.Item>
      <Form.Item label="Ключ">
        <Input
          onChange={(e) => setInputValueKey(e.target.value)}
          defaultValue={defaultKey}
        />
      </Form.Item>

      <Paragraph>Полученный хэш: {hash}</Paragraph>
      <Paragraph>
        Полученная последовательность Парка-Миллера:{" "}
        {Number.parseInt(pmHash, 2)} ({pmHash.length} символов)
      </Paragraph>
      <Paragraph>Полученный шифр: [{encodedTemp.join(", ")}]</Paragraph>
      <Paragraph>
        Полученное дешифрование: {encodedTemp.length && inputValueKey ? matrixHashDecrypt(encoded) : ""}
      </Paragraph>
    </Card>
  );
};

export default Matrix;

import { Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import Paragraph from "antd/es/typography/Paragraph";
import { maHash10Generator } from "../../utils/maHash10Generator";
import { shaffler } from "../../utils/shaffler";
import { parkMillerWithHash } from "../../utils/parkMiller";

const defaultText = "Hello";
const defaultKey = "HelloKey";

const MaHash10 = () => {
  const [inputValueText, setInputValueText] = useState<string>(defaultText);
  const [inputValueKey, setInputValueKey] = useState<string>(defaultKey);
  const [encoded, setEncoded] = useState<string>("");
  const [hash, setHash] = useState<number>(0);
  const [pmHash, setPmHash] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let tempHash = maHash10Generator(inputValueKey);
    let tempPmHash = parkMillerWithHash(tempHash).join("");
    setHash(tempHash);
    setPmHash(tempPmHash);

    const answer = shaffler(inputValueText, tempPmHash);

    if (!answer) {
      setError(true);
      return;
    }

    setEncoded(answer);
    setError(false);
  }, [inputValueText, inputValueKey]);

  return (
    <Card title="MaHash10">
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
      {error && (
        <Paragraph style={{ color: "red" }}>
          Ключ должен быть длинее пароля
        </Paragraph>
      )}
      {!error && (
        <>
          <Paragraph>Полученный хэш: {hash}</Paragraph>
          <Paragraph>Полученный шифр: {encoded}</Paragraph>
          <Paragraph>
            Полученная последовательность Парка-Миллера:
            {Math.round(Number.parseInt(pmHash, 2) / 1e250)} ({pmHash.length} символов)
          </Paragraph>
          <Paragraph>
            Полученное дешифрование: {shaffler(encoded, pmHash)}
          </Paragraph>
        </>
      )}
    </Card>
  );
};

export default MaHash10;

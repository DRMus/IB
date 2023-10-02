import { useEffect, useState, useContext } from "react";
import { parkMiller } from "../../utils/parkMiller";
import { MainContextValues } from "../../contexts/MainContext";
import { Typography } from "antd";

const LabTwo = () => {
  const { sequence } = useContext(MainContextValues);

  const [parkMillerSequence, setParkMillerSequence] = useState<number[]>([]);

  useEffect(() => {
    setParkMillerSequence(parkMiller());
  }, []);
  return (
    <Typography>
      {parkMillerSequence.map((value, idx) => (
        <p key={idx}>{value}</p>
      ))}
    </Typography>
  );
};

export default LabTwo;

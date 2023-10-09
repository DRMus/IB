import { Space } from "antd";
import ParkMiller from "./ParkMiller";
import FIPS186 from "./FIPS186";

const LabTwo = () => {


  return (
    <Space direction="vertical" style={{width: "100%", padding: "8px"}}>
      <ParkMiller/>
      <FIPS186/>
    </Space>
  );
};

export default LabTwo;

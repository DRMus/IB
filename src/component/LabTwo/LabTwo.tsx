import { Space } from "antd";
import ParkMiller from "./ParkMiller";
import FIPS186 from "./FIPS186";
import Geffe from "./Geffe";

const LabTwo = () => {
  return (
    <Space direction="vertical" style={{ width: "100%", padding: "8px" }}>
      <ParkMiller />
      <Geffe />
      <FIPS186 />
    </Space>
  );
};

export default LabTwo;

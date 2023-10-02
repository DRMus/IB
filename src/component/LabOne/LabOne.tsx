import { Space } from "antd";
import { ExtraTest } from "./ExtraTest";
import { FrequensyTest } from "./FrequensyTest";
import { SequenceTest } from "./SequenceTest";

const LabOne = () => {
  return (
    <Space direction="vertical" style={{width: "100%"}}>
      <FrequensyTest />
      <SequenceTest />
      <ExtraTest />
    </Space>
  );
};

export default LabOne;

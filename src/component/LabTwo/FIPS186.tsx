import { Card } from "antd";
import { fipsGenerator } from "../../utils/fipsGenerator";

const FIPS186 = () => {
  fipsGenerator(2, 67);
  return (
    <Card>
      <div>{Number.parseInt("67452301efcdab8998badcfe10325476c3d2e1f0", 16)}</div>
    </Card>
  );
};

export default FIPS186;

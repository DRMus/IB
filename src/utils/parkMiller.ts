import { convertSequenceToArray } from "./convertSequenceToArray";
import { getRndInteger } from "./randomSequence";

export const parkMiller = (length = 500): number[] => {
  let parkMillerSequence: number[] = [];
  let parkMillerBinString = ""

  for (let i = 0; i < length; i++) {
    let prevBit = i - 1 < 0 ? getRndInteger(1, 10) : parkMillerSequence[i - 1];
    parkMillerSequence[i] = (16_807 * prevBit) % (2_147_483_647 - 1);
    parkMillerBinString += parkMillerSequence[i].toString(2);
  }
  return convertSequenceToArray(parkMillerBinString);
};

export const parkMiller = (length = 10000): number[] => {
  let parkMillerSequence: number[] = [];

  for(let i = 0; i < length; i++) {
    let prevBit = i - 1 < 0 ? 1 : parkMillerSequence[i-1];
    parkMillerSequence[i] = (16_807 * prevBit) % 2_147_483_647 - 1;
  }
  return parkMillerSequence
}
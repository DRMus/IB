export function geffeGenerator(
  initialState1: bigint,
  initialState2: bigint,
  initialState3: bigint,
  size: number
) {
  let lfsr1 = lfsrGenerator(initialState1);
  let lfsr2 = lfsrGenerator(initialState2);
  let lfsr3 = lfsrGenerator(initialState3);

  let output = "";

  for (let i = 0; i < size; i++) {
    let bit1 = lfsr1.next().value;
    let bit2 = lfsr2.next().value;
    let bit3 = lfsr3.next().value;

    let xorOutput = (bit1 && bit2) || (!bit1 && bit3);
    output += xorOutput ? "1" : "0";
  }

  return output;
}

function* lfsrGenerator(initialState: bigint) {
  let state = initialState + 1n;

  while (true) {
    let feedback =
      (state & 1n) ^
      ((state >> 1n) & 1n) ^
      ((state >> 3n) & 1n) ^
      ((state >> 4n) & 1n);
    state = (state >> 1n) | (feedback << 15n);

    yield state & 1n;
  }
}

import { generateSequence } from "./randomSequence";

const seporator = (str: string, size: number): string[] => str.length ? ([
  str.slice(0, size),
  ...seporator(str.slice(size), size),
]) : [];



export function fipsGenerator(mCount: number, q: number) {
  const b = 170;
  const s = Number.parseInt(generateSequence(b).join(""), 2);

  console.log(s);
  

  const t = "67452301efcdab8998badcfe10325476c3d2e1f0";
  const x = [];

  function G(t: string, c: number): number {
    const splitedT = seporator(t, 8);
    const addedC = c.toString(2) + "".padStart(512 - b, "0");
    return Number.parseInt(addedC, 2);
  }

  for (let i = 0; i < mCount; i++) {
    let y = Number.parseInt(generateSequence(b).join(""), 2);
    let z = (s + y) % (2 << (b - 1));
    x[i] = G(t, z) % q;
  }

  // console.log(x);
}

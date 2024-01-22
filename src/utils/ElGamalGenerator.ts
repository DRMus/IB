import { lehmannTest } from "./LemmanTest";
import { getRndInteger } from "./randomSequence";

function generatePrimeNumber(bitLength: number): number {
  let randomNumber =
    Math.floor(Math.random() * (2 ** bitLength - 1)) + 2 ** (bitLength - 1);
  while (!lehmannTest(randomNumber, 32)) {
    randomNumber++;
  }
  return randomNumber;
}

function modPow(expo: bigint, base: bigint, p: bigint) {
  // "expo" needs to be of type BigInt
  let x = BigInt(base) % p,
    res = expo & 1n ? x : 1n;
  do {
    x = x ** 2n % p;
    if (expo & 2n) res = (res * x) % p;
  } while ((expo /= 2n));
  return res;
}

function GetPRoot(p: number): number {
  for (let i = 0; i < p; i++) {
    if (IsPRoot(p, i)) {
      return i;
    }
  }
  return 0;
}

function IsPRoot(p: number, a: number): boolean {
  if (a === 0 || a === 1) {
    return false;
  }
  let last = 1;

  const set: Set<number> = new Set<number>();
  for (let i = 0; i < p - 1; i++) {
    last = (last * a) % p;
    if (set.has(last)) {
      return false;
    }
    set.add(last);
  }
  return true;
}

export const elGamalGenerator = {
  generateKeys(msgLength: number) {
    const p = generatePrimeNumber(msgLength + 1); // Генерация простого числа
    const g = GetPRoot(p); // Выбор случайного числа g от 2 до p-1

    const x = getRndInteger(1, p - 1); // Генерация случайного числа x от 1 до p-1
    const y = modPow(BigInt(g), BigInt(x), BigInt(p)); // Вычисление публичного ключа y

    return { p, g, x, y };
  },

  // Шифрование сообщения
  encrypt(message: number, publicKey: { p: number; g: number; y: bigint }) {
    const p = publicKey.p;
    const g = publicKey.g;
    const y = publicKey.y;

    const k = getRndInteger(2, p - 2); // Генерация случайного числа k от 1 до p-1

    const a = Number(modPow(BigInt(g), BigInt(k), BigInt(p))); // Вычисление первой части шифротекста
    const b = Number(modPow(y, BigInt(k), BigInt(p))) ^ message; // Вычисление второй части шифротекста

    return { a, b };
  },

  // Расшифровка сообщения
  decrypt(
    ciphertext: { a: number; b: number },
    privateKey: { x: number; p: number }
  ) {
    const { x, p } = privateKey;
    const { a, b } = ciphertext;

    const m = Number(modPow(BigInt(a), BigInt(p - 1 - x), BigInt(p))) ^ b; // Вычисление исходного сообщения

    return m;
  },
};

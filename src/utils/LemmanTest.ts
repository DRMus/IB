export function lehmannTest(p: number, iterations: number): boolean {
  if (p < 5 && p % 2 === 0) return false;
  for (let i = 0; i < iterations; i++) {
    const a = getRandomInt(2, p - 1); // Генерируем случайное число a от 2 до p-1
    const result = modPow(a, (p - 1) / 2, p); // Вычисляем a^((p-1)/2) mod p

    if (result !== 1 && result !== p - 1) {
      return false; // Если результат не равен 1 и не равен p-1, то число p не является простым
    }
  }

  return true; // Если все итерации пройдены без проблем, то число p с высокой вероятностью простое
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function modPow(base: number, exponent: number, modulus: number): number {
  if (exponent === 0) {
    return 1;
  }

  let result = 1;
  base = base % modulus;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }

    base = (base * base) % modulus;
    exponent = Math.floor(exponent / 2);
  }

  return result;
}

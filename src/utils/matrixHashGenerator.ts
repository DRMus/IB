import * as math from "mathjs";

class Matrix {
  data: number[][];
  N: number;
  M: number;
  constructor(
    n: number,
    m: number,
    selector?: (i: number, j: number) => number
  ) {
    this.data = Array(n)
      .fill(null)
      .map(() => Array(m).fill(null));
    this.N = n;
    this.M = m;

    if (selector) {
      this.forEach((i: any, j: any) => {
        this.data[i][j] = selector(i, j);
      });
    }
  }

  row(i: any) {
    return new Matrix(1, this.M, (_, j) => this.data[i][j]);
  }

  column(j: any) {
    return new Matrix(this.N, 1, (i, _) => this.data[i][j]);
  }

  minor(r: any, c: any) {
    return new Matrix(
      this.N - 1,
      this.M - 1,
      (i, j) => this.data[i < r ? i : i + 1][j < c ? j : j + 1]
    );
  }

  transpose() {
    return new Matrix(this.M, this.N, (i, j) => this.data[j][i]);
  }

  determinant() {
    if (this.N != this.M) {
      throw new Error("Possible only for square matrices");
    }

    if (this.N == 1) {
      return this.data[0][0];
    }

    const row = this.row(0);
    const tempMatrix: any = new Matrix(
      this.N,
      1,
      (i, j) => this.minor(0, i).determinant() * this.d(i)
    );

    return row.multiply(tempMatrix).determinant();
  }

  toString() {
    return this.data
      .map((row) => row.map((x) => x.toFixed(2)).join(" "))
      .join("\n");
  }

  multiply(otherMatrix: any): any {
    if (this.M != otherMatrix.N) {
      throw new Error("Wrong dimensions");
    }

    if (this.N == 1) {
      return new Matrix(1, 1, (i, j) =>
        this.data[0].reduce(
          (acc, val, index) => acc + val * otherMatrix.data[index][0],
          0
        )
      );
    }

    return new Matrix(this.N, otherMatrix.M, (i, j) =>
      this.row(i).multiply(otherMatrix.column(j)).determinant()
    );
  }

  cofactor() {
    return new Matrix(
      this.N,
      this.M,
      (i, j) => this.minor(i, j).determinant() * this.d(i + j)
    );
  }

  inverse() {
    if (this.N != this.M) {
      throw new Error("Possible only for square matrices");
    }

    return this.cofactor().transpose().divide(this.determinant());
  }

  inverseLeft() {
    return this.transpose().multiply(this.multiply(this.transpose()).inverse());
  }

  inverseRight() {
    return this.transpose().multiply(this).inverse().multiply(this.transpose());
  }

  d(i: any) {
    return i % 2 === 0 ? 1 : -1;
  }

  forEach(action: any) {
    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.M; j++) {
        action(i, j, this.data[i][j]);
      }
    }
    return this;
  }

  static fromArray(array: any) {
    const n = array.length;
    const m = array[0].length;

    return new Matrix(n, m, (i, j) => array[i][j]);
  }

  divide(a: any) {
    return new Matrix(this.N, this.M, (i, j) => this.data[i][j] / a);
  }
}

function matrixVectorMultiplication(
  matrix: number[][],
  vector: number[]
): number[] {
  const result: number[] = [];

  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }

  return result;
}

function convertStringToNumber(str: string) {
  return Array.from(str).map((char) => char.charCodeAt(0));
}

function Determinant(A: number[][]) {
  // Используется алгоритм Барейса, сложность O(n^3)
  var N = A.length,
    B: number[][] = [],
    denom = 1,
    exchanges = 0;
  for (var i = 0; i < N; ++i) {
    B[i] = [];
    for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
  }
  for (var i = 0; i < N - 1; ++i) {
    var maxN = i,
      maxValue = Math.abs(B[i][i]);
    for (var j = i + 1; j < N; ++j) {
      var value = Math.abs(B[j][i]);
      if (value > maxValue) {
        maxN = j;
        maxValue = value;
      }
    }
    if (maxN > i) {
      var temp = B[i];
      B[i] = B[maxN];
      B[maxN] = temp;
      ++exchanges;
    } else {
      if (maxValue == 0) return maxValue;
    }
    var value1 = B[i][i];
    for (var j = i + 1; j < N; ++j) {
      var value2 = B[j][i];
      B[j][i] = 0;
      for (var k = i + 1; k < N; ++k)
        B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
    }
    denom = value1;
  }
  if (exchanges % 2) return -B[N - 1][N - 1];
  else return B[N - 1][N - 1];
}

function AdjugateMatrix(A: number[][]) {
  // A - двумерный квадратный массив
  var N = A.length,
    adjA: number[][] = [];
  for (var i = 0; i < N; i++) {
    adjA[i] = [];
    for (var j = 0; j < N; j++) {
      var B: number[][] = [],
        sign = (i + j) % 2 == 0 ? 1 : -1;
      for (var m = 0; m < j; m++) {
        B[m] = [];
        for (var n = 0; n < i; n++) B[m][n] = A[m][n];
        for (var n = i + 1; n < N; n++) B[m][n - 1] = A[m][n];
      }
      for (var m = j + 1; m < N; m++) {
        B[m - 1] = [];
        for (var n = 0; n < i; n++) B[m - 1][n] = A[m][n];
        for (var n = i + 1; n < N; n++) B[m - 1][n - 1] = A[m][n];
      }
      adjA[i][j] = sign * Determinant(B); // Функцию Determinant см. выше
    }
  }
  return adjA;
}

function InverseMatrix(A: number[][]) {
  // A - двумерный квадратный массив
  var det = Determinant(A); // Функцию Determinant см. выше
  if (det == 0) return false;
  var N = A.length,
    A = AdjugateMatrix(A); // Функцию AdjugateMatrix см. выше
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) A[i][j] /= det;
  }
  return A;
}

// Пример использования:
const matrixInit = [
  [1, 4, 8],
  [3, 7, 2],
  [6, 8, 5],
];

export function matrixHashEncrypt(message: string, matrix = matrixInit) {
  const byteArray = convertStringToNumber(message);
  const encryptedBytes = [];

  for (let i = 0; i < byteArray.length; i += 3) {
    const chunk = byteArray.slice(i, i + 3);

    if (chunk.length < 3) {
      while(chunk.length !== 3) {
        chunk.push(0);
      }
    }

    const wordChunk = matrixVectorMultiplication(matrix, chunk);

    encryptedBytes.push(...wordChunk);
  }

  return encryptedBytes;
}

export function matrixHashDecrypt(
  encryptedBytes: number[],
  matrix = matrixInit
) {
  const mx = new Matrix(3, 3);
  mx.data = matrix;
  const invertedMatrix = InverseMatrix(matrix);
  if (!invertedMatrix) return;
  const decryptedBytes = [];

  for (let i = 0; i < encryptedBytes.length; i += 3) {
    const chunk = encryptedBytes.slice(i, i + 3);

    const wordChunk = matrixVectorMultiplication(invertedMatrix, chunk);

    decryptedBytes.push(...wordChunk);
  }

  return String.fromCharCode(...decryptedBytes);
}

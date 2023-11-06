export function getPrimeNumber(max: number) {
    var array = [], limit = Math.sqrt(max), result = [];

    // Создаю массив от 2 до (n - 1)
    for (var i = 2; i < max; i++) {
        array.push(true);
    }

    // Удаляю кратные 2, 3, 5...
    for (var i = 2; i <= limit; i++) {
        if (array[i]) {
            for (var j = i * i; j < max; j += i) {
                array[j] = false;
            }
        }
    }

    // Все значения массива [i] true являются простыми числами
    for (var i = 2; i < max; i++) {
        if(array[i]) {
            result.push(i);
        }
    }

    return result;
};

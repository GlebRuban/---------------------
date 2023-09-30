const buffer = []

function processValue(value) {
  buffer.push(value)

  // ограничеваем буфер до 10 значений 

  if(buffer.length > 10){
    buffer.shift()
  }

  // Отсекаем минимальное и максимальное значение

  const bufferSorted = buffer.slice().sort() 
  bufferSorted.shift() // удаляем первый массив 
  bufferSorted.pop(); // удаляем полседний массив 

// Вычисляем медиану, среднее арифметическое и дисперсию

  const median = calculateMedian(bufferSorted)
  const mean = calculateMean(bufferSorted)
  const variance = calculateVariance(bufferSorted,mean)

  return {mean,median,variance}
}

// Функция для вычисления медианы

function calculateMedian(arr) {

  const middle = Math.floor(arr.length / 2)
  if (arr.length % 2 === 0 ) {
    return (arr[middle - 1] + arr[middle]) / 2
    
  }else{
    return arr[middle]
  }
}

// Функция для вычисления среднего арифметического

function calculateMean(arr) {

  const sum = arr.reduce((acc,val) => acc + val,0)
  return sum / arr.length; 

}

// Функция для вычисления дисперсии

function calculateVariance(arr,mean) {
  const squaredDifferences = arr.map(val => Math.pow(val - mean, 2))
  const sumOfSquareDifferences  = squaredDifferences.reduce((acc,val) => acc + val, 0)
  return sumOfSquareDifferences / arr.length
}


// Главная функция, которая вызывает processValue каждые 100 мс

function mainLoop() {
  setInterval(() => {
    const value = getExternalValue(); 
    const result  = processValue(value); 

    console.log(`Медиана: ${result.median}, Среднее: ${result.mean}, Дисперсия: ${result.variance} `);
  }, 100)
}

// Функция для имитации получения значения из внешней подпрограммы

function getExternalValue() {

  return Math.random() * 100; 
}

mainLoop(); 

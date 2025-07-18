export async function insertionSort(numbers, drawBars, pause, markSorted, speed) {
  for (let i = 1; i < numbers.length; i++) {
    let key = numbers[i];
    let j = i - 1;
    while (j >= 0 && numbers[j] > key) {
      numbers[j + 1] = numbers[j];
      drawBars(numbers, [j, j + 1]);
      await pause(speed);
      j--;
    }
    numbers[j + 1] = key;
    drawBars(numbers, [j + 1]);
    await pause(speed);
  }
  drawBars(numbers);
  markSorted();
}

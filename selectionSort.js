export async function selectionSort(numbers, drawBars, pause, markSorted, speed) {
  for (let i = 0; i < numbers.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < numbers.length; j++) {
      drawBars(numbers, [minIndex, j]);
      await pause(speed);
      if (numbers[j] < numbers[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [numbers[i], numbers[minIndex]] = [numbers[minIndex], numbers[i]];
      drawBars(numbers, [i, minIndex]);
      await pause(speed);
    }
  }
  drawBars(numbers);
  markSorted();
}

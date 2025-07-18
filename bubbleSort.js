export async function bubbleSort(numbers, drawBars, pause, markSorted, speed) {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - i - 1; j++) {
      drawBars(numbers, [j, j + 1]);
      await pause(speed);
      if (numbers[j] > numbers[j + 1]) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
        drawBars(numbers, [j, j + 1]);
        await pause(speed);
      }
    }
  }
  drawBars(numbers);
  markSorted();
}

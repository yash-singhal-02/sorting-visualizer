async function heapify(numbers, size, i, drawBars, pause, speed) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < size && numbers[left] > numbers[largest]) largest = left;
  if (right < size && numbers[right] > numbers[largest]) largest = right;

  if (largest !== i) {
    [numbers[i], numbers[largest]] = [numbers[largest], numbers[i]];
    drawBars(numbers, [i, largest]);
    await pause(speed);
    await heapify(numbers, size, largest, drawBars, pause, speed);
  }
}

export async function heapSort(numbers, drawBars, pause, markSorted, speed) {
  const n = numbers.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(numbers, n, i, drawBars, pause, speed);
  }

  for (let i = n - 1; i > 0; i--) {
    [numbers[0], numbers[i]] = [numbers[i], numbers[0]];
    drawBars(numbers, [0, i]);
    await pause(speed);
    await heapify(numbers, i, 0, drawBars, pause, speed);
  }

  drawBars(numbers);
  markSorted();
}

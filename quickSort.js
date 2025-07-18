async function partition(numbers, start, end, drawBars, pause, speed) {
  const pivot = numbers[end];
  let i = start - 1;
  for (let j = start; j < end; j++) {
    drawBars(numbers, [j, end]);
    await pause(speed);
    if (numbers[j] < pivot) {
      i++;
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      drawBars(numbers, [i, j]);
      await pause(speed);
    }
  }
  [numbers[i + 1], numbers[end]] = [numbers[end], numbers[i + 1]];
  drawBars(numbers, [i + 1, end]);
  await pause(speed);
  return i + 1;
}

export async function quickSort(numbers, drawBars, pause, markSorted, speed, start = 0, end = numbers.length - 1) {
  if (start < end) {
    const pivotIndex = await partition(numbers, start, end, drawBars, pause, speed);
    await quickSort(numbers, drawBars, pause, markSorted, speed, start, pivotIndex - 1);
    await quickSort(numbers, drawBars, pause, markSorted, speed, pivotIndex + 1, end);
  }

  if (start === 0 && end === numbers.length - 1) markSorted();
}

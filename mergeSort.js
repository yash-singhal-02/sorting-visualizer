export async function mergeSort(numbers, drawBars, pause, markSorted, speed, start = 0, end = numbers.length - 1) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(numbers, drawBars, pause, markSorted, speed, start, mid);
  await mergeSort(numbers, drawBars, pause, markSorted, speed, mid + 1, end);

  let left = start, right = mid + 1;
  const merged = [];

  while (left <= mid && right <= end) {
    if (numbers[left] < numbers[right]) {
      merged.push(numbers[left++]);
    } else {
      merged.push(numbers[right++]);
    }
  }
  while (left <= mid) merged.push(numbers[left++]);
  while (right <= end) merged.push(numbers[right++]);

  for (let i = 0; i < merged.length; i++) {
    numbers[start + i] = merged[i];
    drawBars(numbers, [start + i]);
    await pause(speed);
  }

  if (start === 0 && end === numbers.length - 1) markSorted();
}

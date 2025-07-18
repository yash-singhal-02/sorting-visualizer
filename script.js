import { bubbleSort } from './algorithms/bubbleSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { heapSort } from './algorithms/heapSort.js';
import { quickSort } from './algorithms/quickSort.js';

let numbers = [];
let sortingSpeed = 100;
let complexityChart;

const complexityValues = {
  "O(1)": 1,
  "O(log n)": 2,
  "O(n)": 3,
  "O(n log n)": 4,
  "O(n²)": 5
};

const algorithmInfo = {
  bubble: {
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    description: "Bubble Sort repeatedly compares and swaps adjacent elements if they are in the wrong order."
  },
  insertion: {
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    description: "Insertion Sort inserts each element into its correct position in the sorted part of the array."
  },
  selection: {
    name: "Selection Sort",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    description: "Selection Sort selects the smallest element and places it at the beginning."
  },
  merge: {
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    description: "Merge Sort divides the array into halves and merges them in sorted order."
  },
  quick: {
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    description: "Quick Sort picks a pivot and sorts elements around it using recursion."
  },
  heap: {
    name: "Heap Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
    description: "Heap Sort builds a heap and removes the maximum element one by one to sort the array."
  }
};

function pause(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function drawBars(arr, highlighted = []) {
  const container = document.getElementById("bars-container");
  container.innerHTML = "";
  const width = 100 / arr.length;

  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${arr[i]}px`;
    bar.style.width = `${width}%`;
    bar.textContent = arr[i];
    if (highlighted.includes(i)) {
      bar.style.backgroundColor = "orange";
    }
    container.appendChild(bar);
  }
}

function markSorted() {
  document.querySelectorAll(".bar").forEach(bar => {
    bar.style.backgroundColor = "limegreen";
  });
}

function generateBars() {
  const size = document.getElementById("sizeSlider").value;
  numbers = [];
  for (let i = 0; i < size; i++) {
    numbers.push(Math.floor(Math.random() * 350) + 10);
  }
  drawBars(numbers);
}

function setInputArray() {
  const input = document.getElementById("manualInput").value;
  const values = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
  if (values.length === 0) {
    alert("Enter valid comma-separated numbers.");
    return;
  }
  numbers = values;
  drawBars(numbers);
}

function updateAlgoInfo() {
  const algo = document.getElementById("algo").value;
  const info = algorithmInfo[algo];

  // Text info
  document.getElementById("algo-info").innerHTML = `
    <h3>${info.name}</h3>
    <p><strong>Best Case:</strong> ${info.best}</p>
    <p><strong>Average Case:</strong> ${info.average}</p>
    <p><strong>Worst Case:</strong> ${info.worst}</p>
    <p><strong>Space Complexity:</strong> ${info.space}</p>
    <p><strong>Description:</strong> ${info.description}</p>
  `;

  // Chart info
  const best = complexityValues[info.best] || 0;
  const avg = complexityValues[info.average] || 0;
  const worst = complexityValues[info.worst] || 0;

  const ctx = document.getElementById("complexityChart").getContext("2d");
  if (complexityChart) complexityChart.destroy();
  complexityChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Best Case", "Average Case", "Worst Case"],
      datasets: [{
        label: "Time Complexity",
        data: [best, avg, worst],
        backgroundColor: ["green", "orange", "red"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: function(value) {
              return Object.keys(complexityValues).find(key => complexityValues[key] === value) || '';
            }
          }
        }
      }
    }
  });
}

function startSort() {
  const algo = document.getElementById("algo").value;
  sortingSpeed = 210 - document.getElementById("speedSlider").value;

  if (algo === "bubble") bubbleSort(numbers, drawBars, pause, markSorted, sortingSpeed);
  else if (algo === "insertion") insertionSort(numbers, drawBars, pause, markSorted, sortingSpeed);
  else if (algo === "selection") selectionSort(numbers, drawBars, pause, markSorted, sortingSpeed);
  else if (algo === "merge") mergeSort(numbers, drawBars, pause, markSorted, sortingSpeed);
  else if (algo === "heap") heapSort(numbers, drawBars, pause, markSorted, sortingSpeed);
  else if (algo === "quick") quickSort(numbers, drawBars, pause, markSorted, sortingSpeed);
}

document.getElementById("algo").addEventListener("change", updateAlgoInfo);

window.generateBars = generateBars;
window.setInputArray = setInputArray;
window.startSort = startSort;

window.onload = () => {
  generateBars();
  updateAlgoInfo();
};

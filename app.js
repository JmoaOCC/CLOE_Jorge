import { generateStrengthWeek } from './data/progressionEngine.js';
import { generateRunningWeek } from './data/runningEngine.js';
import { generateNutrition } from './data/nutritionEngine.js';

let currentWeek = 1;

window.loadModule = function(module) {

  if (module === "dashboard") {
    document.getElementById("mainContent").innerHTML =
      `<h2>Semana ${currentWeek}</h2><button onclick="nextWeek()">Siguiente semana</button>`;
  }

  if (module === "entrenamiento") {
    const data = generateStrengthWeek(currentWeek);
    render(data);
  }

  if (module === "running") {
    const data = generateRunningWeek(currentWeek);
    render(data);
  }

  if (module === "nutricion") {
    const data = generateNutrition();
    render(data);
  }
};

function render(data) {
  document.getElementById("mainContent").innerHTML =
    `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

window.nextWeek = function () {
  currentWeek++;
  loadModule('dashboard');
};

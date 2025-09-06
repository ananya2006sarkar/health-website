// --- Avatar Creator ---
const skin = document.getElementById("skin");
const hair = document.getElementById("hair");
const clothes = document.getElementById("clothes");

document.getElementById("skinSelect").addEventListener("change", e => {
  skin.src = "images/" + e.target.value;
});
document.getElementById("hairSelect").addEventListener("change", e => {
  hair.src = "images/" + e.target.value;
});
document.getElementById("clothesSelect").addEventListener("change", e => {
  clothes.src = "images/" + e.target.value;
});

// --- Calorie Tracker (calls backend AI) ---
async function getCalories() {
  const food = document.getElementById("foodInput").value;
  const res = await fetch("/api/calories?food=" + food);
  const data = await res.json();
  document.getElementById("calorieResult").innerText =
    `${food} ≈ ${data.calories} kcal`;
}

// --- BMI Calculator ---
function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100;
  const bmi = (weight / (height * height)).toFixed(2);
  document.getElementById("bmiResult").innerText = `Your BMI: ${bmi}`;
}

// --- Water Reminder ---
let waterDrunk = 0;
function addWater() {
  const goal = parseInt(document.getElementById("waterGoal").value);
  const intake = parseInt(document.getElementById("waterIntake").value);
  waterDrunk += intake;
  document.getElementById("waterResult").innerText =
    `You drank ${waterDrunk}ml / ${goal}ml today`;
}

// --- Sleep Reminder ---
function setSleepReminder() {
  const time = document.getElementById("sleepTime").value;
  document.getElementById("sleepResult").innerText =
    `Reminder set for ${time}`;
}

// --- Pedometer ---
function calculateCaloriesBurned() {
  const steps = parseInt(document.getElementById("stepInput").value);
  const calories = (steps * 0.04).toFixed(2); // approx 0.04 kcal per step
  document.getElementById("stepsResult").innerText =
    `${steps} steps ≈ ${calories} kcal burned`;
}

// --- Joyful Activities ---
function addJoy() {
  const activity = document.getElementById("joyInput").value;
  if (activity) {
    const li = document.createElement("li");
    li.textContent = activity;
    document.getElementById("joyList").appendChild(li);
    document.getElementById("joyInput").value = "";
  }
}async function getCalories() {
  const food = document.getElementById("foodInput").value;
  const res = await fetch("/api/calories?food=" + food);
  const data = await res.json();

  if (data.error) {
    document.getElementById("calorieResult").innerText = "❌ " + data.error;
  } else {
    document.getElementById("calorieResult").innerText =
      `${data.food} ≈ ${data.calories} kcal 
       🍗 Protein: ${data.protein}g 
       🍞 Carbs: ${data.carbs}g 
       🥑 Fat: ${data.fat}g`;
  }
}


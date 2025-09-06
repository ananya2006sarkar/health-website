const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

// Replace with your Nutritionix keys
const APP_ID = "YOUR_APP_ID";
const API_KEY = "YOUR_API_KEY";

app.get("/api/calories", async (req, res) => {
  const food = req.query.food;
  try {
    const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": APP_ID,
        "x-app-key": API_KEY
      },
      body: JSON.stringify({ query: food })
    });

    const data = await response.json();
    if (data.foods && data.foods.length > 0) {
      res.json({
        food: data.foods[0].food_name,
        calories: data.foods[0].nf_calories,
        protein: data.foods[0].nf_protein,
        carbs: data.foods[0].nf_total_carbohydrate,
        fat: data.foods[0].nf_total_fat
      });
    } else {
      res.json({ error: "Food not found" });
    }
  } catch (err) {
    res.json({ error: "API error", details: err.message });
  }
});

app.use(express.static(".")); // Serve frontend files

app.listen(PORT, () => console.log(`Zenith running on http://localhost:${PORT}`));

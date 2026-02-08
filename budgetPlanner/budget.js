// Estimated ingredient price weights (Mock Database)
const priceWeights = {
    chicken: 150, beef: 250, egg: 15, milk: 30, 
    rice: 20, potato: 10, tomato: 10, flour: 15,
    sugar: 10, pasta: 40, bread: 25, chocolate: 50
};

async function calculateBudgetMeals() {
    const limit = parseFloat(document.getElementById('budget-limit').value);
    const grid = document.getElementById('budget-results');
    const status = document.getElementById('budget-status');

    if (!limit) return alert("Enter your budget first!");

    grid.innerHTML = "<p style='grid-column: 1/-1;'>Scanning market prices...</p>";
    status.innerText = `Analyzing meals under ₹${limit}...`;

    try {
        // Fetch recipes to analyze
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        const data = await res.json();
        
        // Calculate costs and filter
        const affordableMeals = data.meals.filter(meal => {
            let totalCost = 30; // Base cost (oil/spices)
            for (let i = 1; i <= 20; i++) {
                const ing = meal[`strIngredient${i}`]?.toLowerCase();
                if (ing) {
                    const weightKey = Object.keys(priceWeights).find(k => ing.includes(k));
                    totalCost += weightKey ? priceWeights[weightKey] : 20; // Default 20
                }
            }
            meal.calculatedCost = totalCost;
            return totalCost <= limit;
        }).sort((a, b) => a.calculatedCost - b.calculatedCost);

        renderBudgetResults(affordableMeals);
    } catch (err) {
        grid.innerHTML = "<p>Data synchronization error.</p>";
    }
}

function renderBudgetResults(meals) {
    const grid = document.getElementById('budget-results');
    grid.innerHTML = "";

    if (meals.length === 0) {
        grid.innerHTML = "<p style='grid-column: 1/-1;'>No meals match this budget. Try increasing your spend.</p>";
        return;
    }

    grid.innerHTML = meals.map(meal => `
        <div class="recipe-card" style="position:relative;" onclick="openModal('${meal.idMeal}')">
            <div class="price-badge">₹${meal.calculatedCost}</div>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="card-info" style="padding: 20px;">
                <h3>${meal.strMeal}</h3>
                <p style="color: #10b981; font-weight: 600;">Great Value Match</p>
            </div>
        </div>
    `).join('');
}

function setBudget(val) {
    document.getElementById('budget-limit').value = val;
    calculateBudgetMeals();
}

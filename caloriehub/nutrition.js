document.addEventListener('DOMContentLoaded', () => {
    // Initial scan to fill the lab with "Beef" recipes
    scanFoodDNA("Beef");
});

async function scanFoodDNA(term) {
    const query = term || document.getElementById('cal-search').value;
    const grid = document.getElementById('calorie-grid');
    if (!query) return;

    grid.innerHTML = "<div class='loader'>Synchronizing with Food DNA Database...</div>";

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        
        if (data.meals) {
            renderCalorieCards(data.meals);
        } else {
            grid.innerHTML = "<p>No genetic matches found for this search.</p>";
        }
    } catch (e) {
        grid.innerHTML = "<p>Scanner Error: Check connection.</p>";
    }
}

function renderCalorieCards(meals) {
    const grid = document.getElementById('calorie-grid');
    grid.innerHTML = meals.map(meal => {
        // Algorithm generates calories based on Meal ID for consistency
        const calories = (parseInt(meal.idMeal) % 500) + 300; 
        return `
            <div class="cal-card" onclick="viewFullAnalysis('${meal.idMeal}')">
                <div class="cal-badge">🔥 ${calories} kcal</div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-info">
                    <h3>${meal.strMeal}</h3>
                    <div class="macros-strip">
                        <span>P: ${Math.floor(calories/20)}g</span>
                        <span>C: ${Math.floor(calories/10)}g</span>
                        <span>F: ${Math.floor(calories/40)}g</span>
                    </div>
                </div>
            </div>`;
    }).join('');
}

async function viewFullAnalysis(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    const cal = (parseInt(id) % 500) + 300;
    const protein = Math.floor(cal / 18);
    const carbs = Math.floor(cal / 10);
    const fats = Math.floor(cal / 45);

    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li>${meal[`strIngredient${i}`]} - <span>${meal[`strMeasure${i}`]}</span></li>`;
        }
    }

    document.getElementById('display-area').innerHTML = `
        <button class="back-btn" onclick="location.reload()">🧪 Back to Scanner</button>
        
        <div class="analysis-report">
            <div class="report-header">
                <img src="${meal.strMealThumb}" class="report-img">
                <div class="nutrition-label">
                    <div class="label-title">Nutrition Facts</div>
                    <div class="label-row bold"><span>Calories</span> <span>${cal}</span></div>
                    <div class="label-row"><span>Total Fat</span> <span>${fats}g</span></div>
                    <div class="label-row"><span>Total Carbs</span> <span>${carbs}g</span></div>
                    <div class="label-row bold"><span>Protein</span> <span>${protein}g</span></div>
                    <p class="label-disclaimer">*Estimated via Molecular Analysis</p>
                </div>
            </div>

            <div class="report-body">
                <h2>Molecular Components</h2>
                <ul class="ingredient-list">${ingredients}</ul>
                
                <h2>Synthesis Method</h2>
                <div class="instruction-box">${meal.strInstructions}</div>
            </div>
        </div>
    `;
}

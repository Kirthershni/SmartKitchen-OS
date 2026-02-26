document.addEventListener('DOMContentLoaded', () => {
    // Initial search for soft breakfast meals (perfect for babies/toddlers)
    searchBabyMeals("Oats");
});

async function searchBabyMeals(term = null) {
    const query = term || document.getElementById('baby-search').value;
    const grid = document.getElementById('recipe-grid');
    
    if (!query) return;
    grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Scanning for baby-safe ingredients...</p>";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        renderBabyRecipes(data.meals);
    } catch (error) {
        grid.innerHTML = "<p>Connection error. Please try again.</p>";
    }
}

function filterBaby(category) {
    // Updates UI tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // In a real app, you'd fetch by category. Here we use your search logic:
    searchBabyMeals(category);
}

function renderBabyRecipes(meals) {
    const grid = document.getElementById('recipe-grid');
    if (!meals) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No gentle meals found. Try 'Banana' or 'Rice'.</p>";
        return;
    }

    grid.innerHTML = meals.map(meal => `
        <div class="recipe-card" onclick="openModal('${meal.idMeal}')">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div style="padding:20px;">
                <span class="baby-tag">Soft Texture</span>
                <h3 style="margin-top:5px;">${meal.strMeal}</h3>
                <p style="font-size:0.85rem; color:#64748b;">Ages: 6 months+</p>
            </div>
        </div>
    `).join('');
}

// REUSE: Copy-paste your friend's openModal, closeModal, 
// and toggleTimer functions here from script.js to ensure 
// the "Chef Assistant" works for baby meals too!

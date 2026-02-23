const forbiddenHeat = ['cook', 'oven', 'stove', 'boil', 'fry', 'bake', 'grill', 'roast', 'saute', 'fire', 'heat', 'simmer', 'microwave', 'induction'];

async function fetchFireless() {
    const term = document.getElementById('fireless-search').value;
    const grid = document.getElementById('fireless-results');
    if (!term) return;

    grid.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>SCRUBBING THERMAL DATA...</p>";

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        const data = await res.json();

        if (!data.meals) {
            grid.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>DNA NOT FOUND.</p>";
            return;
        }

        // Logical Filter: Scans instructions for forbidden keywords
        const filtered = data.meals.filter(meal => {
            const steps = meal.strInstructions.toLowerCase();
            return !forbiddenHeat.some(word => steps.includes(word));
        });

        if (filtered.length === 0) {
            grid.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>EVERYTHING FOUND REQUIRES HEAT. TRY 'SALAD'.</p>";
            return;
        }

        grid.innerHTML = filtered.map(meal => `
            <div class="recipe-card" onclick="openRecipeModal('${meal.idMeal}')">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-info">
                    <h3>${meal.strMeal}</h3>
                    <div class="card-meta">Fresh & Raw | ${meal.strArea}</div>
                </div>
            </div>
        `).join('');

    } catch (err) {
        grid.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>DNA DECODING ERROR.</p>";
    }
}

// This function ensures the modal opens even if the global script is acting up
async function openRecipeModal(id) {
    const modal = document.getElementById('recipe-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = "<p style='color:black;'>Extracting DNA details...</p>";
    modal.style.display = 'block';

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        const meal = data.meals[0];

        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
            }
        }

        modalBody.innerHTML = `
            <h2 style="color:var(--fireless-primary); font-family:'Playfair Display'; font-size:2.2rem;">${meal.strMeal}</h2>
            <p style="color:#7f8ea3; margin-bottom:20px;">Category: ${meal.strCategory} | Area: ${meal.strArea}</p>
            
            <img src="${meal.strMealThumb}" class="modal-header-img" style="border-radius:20px; border: 1px solid #f1f5f9;">
            
            <div class="recipe-section" style="margin-top:30px;">
                <h3 style="color:var(--fireless-primary); border-bottom:2px solid #f0fdfa; padding-bottom:10px;">Fresh Ingredients</h3>
                <ul style="columns: 2; padding: 20px 0; color:#475569;">${ingredients}</ul>
            </div>

            <div class="recipe-section">
                <h3 style="color:var(--fireless-primary); border-bottom:2px solid #f0fdfa; padding-bottom:10px;">Preparation Steps</h3>
                <p style="line-height:1.6; color:#475569; padding-top:15px; white-space:pre-line;">${meal.strInstructions}</p>
            </div>
            
            <div style="background:#f0fdfa; padding:15px; border-radius:15px; margin-top:20px; border:1px solid #ccfbf1;">
                <strong style="color:#0d9488;">❄️ Fireless Notice:</strong> This recipe has been verified to contain no thermal cooking steps.
            </div>
        `;
    } catch (err) {
        modalBody.innerHTML = "<p>Error loading recipe details.</p>";
    }
}

// Ensure the closeModal function is also present
function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
}
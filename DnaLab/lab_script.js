// Main Search Logic
async function runDNALab() {
    const input = document.getElementById('fridge-input').value.toLowerCase();
    const fridgeItems = input.split(',').map(i => i.trim()).filter(i => i !== "");
    const grid = document.getElementById('lab-results');

    if (fridgeItems.length === 0) return alert("Please select or type ingredients!");

    grid.innerHTML = "<p>Analyzing DNA markers...</p>";

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${fridgeItems[0]}`);
        const data = await res.json();
        
        if (!data.meals) {
            grid.innerHTML = "<p>No genetic matches found.</p>";
            return;
        }

        const detailedMeals = await Promise.all(
            data.meals.slice(0, 8).map(async (m) => {
                const detailRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`);
                const detailData = await detailRes.json();
                return detailData.meals[0];
            })
        );

        renderMatches(detailedMeals, fridgeItems);
    } catch (err) {
        grid.innerHTML = "<p>Scan failed. Check connection.</p>";
    }
}

function renderMatches(meals, fridgeItems) {
    const grid = document.getElementById('lab-results');
    grid.innerHTML = "";

    meals.forEach(meal => {
        let recipeIngs = [];
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) recipeIngs.push(meal[`strIngredient${i}`].toLowerCase());
        }

        const matches = recipeIngs.filter(ing => fridgeItems.some(f => ing.includes(f)));
        const score = Math.round((matches.length / recipeIngs.length) * 100);

        grid.innerHTML += `
            <div class="recipe-card" onclick="openModal('${meal.idMeal}')">
                <div class="match-badge">${score}%</div>
                
                <img src="${meal.strMealThumb}" style="width:100%; height:200px; object-fit:cover;">
                <div class="card-info" style="padding:20px;">
                    <h3 style="font-size:1.1rem; margin-bottom:5px;">${meal.strMeal}</h3>
                    <p style="font-size:0.8rem; color:#64748b;">Missing ${recipeIngs.length - matches.length} markers</p>
                </div>
            </div>
        `;
    });
}

// Modal Logic (Directly showing instructions and ingredients)
async function openModal(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    let ingredientsList = "";
    for(let i=1; i<=20; i++) {
        const ing = meal[`strIngredient${i}`];
        if(ing && ing.trim() !== "") {
            ingredientsList += `<li>${ing} - ${meal[`strMeasure${i}`]}</li>`;
        }
    }

    document.getElementById('modal-body').innerHTML = `
        <h2 style="font-size:2.5rem; margin-bottom:15px;">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" style="width:100%; height:350px; object-fit:cover; border-radius:15px; margin-bottom:20px;">
        
        <div class="recipe-section">
            <h3 style="color:var(--accent);">Ingredients</h3>
            <ul style="columns: 2; margin-bottom: 25px;">${ingredientsList}</ul>
        </div>

        <div class="recipe-section">
            <h3 style="color:var(--accent);">Instructions</h3>
            <p style="white-space:pre-line; line-height:1.6;">${meal.strInstructions}</p>
        </div>
    `;
    document.getElementById('recipe-modal').style.display = 'block';
}

function closeModal() { document.getElementById('recipe-modal').style.display = 'none'; }

function addToFridge(item) {
    const input = document.getElementById('fridge-input');
    let val = input.value.trim();
    if (val.toLowerCase().includes(item.toLowerCase())) return;
    input.value = val === "" ? item : `${val}, ${item}`;
}

function clearFridge() {
    document.getElementById('fridge-input').value = "";
    document.getElementById('lab-results').innerHTML = "";
}

window.onclick = (e) => { if (e.target == document.getElementById('recipe-modal')) closeModal(); };
window.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });

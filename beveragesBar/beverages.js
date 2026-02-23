const API_KEY = "7583a22941f0401296c4d89614c88ff4";
let drinkList = [];

async function fetchBeverages() {
    const query = document.getElementById('bev-search').value;
    const grid = document.getElementById('bev-results');
    
    if (!query) return;

    grid.innerHTML = "<p>Distilling ingredients...</p>";

    try {
        const response = await fetch(`https://api.apileague.com/search-drinks?api-key=${API_KEY}&query=${query}`);
        const data = await response.json();
        
        drinkList = data.drinks; // Store locally for modal access
        renderDrinks(drinkList);
    } catch (err) {
        grid.innerHTML = "<p>Connection error. The bar is temporarily closed.</p>";
    }
}

function renderDrinks(drinks) {
    const grid = document.getElementById('bev-results');
    if (!drinks || drinks.length === 0) {
        grid.innerHTML = "<p>No such elixir found.</p>";
        return;
    }

    grid.innerHTML = drinks.map(drink => {
        // Use glass type or a default category for the subtext
        const subtext = drink.glass_type ? drink.glass_type : "Artisanal Drink";
        
        return `
        <div class="recipe-card" onclick="openBevModal(${drink.id})">
            <img src="${drink.images[1] || drink.images[0]}" alt="${drink.title}">
            <div class="card-info">
                <h3>${drink.title}</h3>
                <div class="card-meta">${subtext}</div>
            </div>
        </div>
        `;
    }).join('');
}

function openBevModal(id) {
    const drink = drinkList.find(d => d.id === id);
    const modalBody = document.getElementById('modal-body');
    
    // Parse Nutrition
    const calories = drink.nutrition.nutrients.find(n => n.name === "Calories");
    const protein = drink.nutrition.nutrients.find(n => n.name === "Protein");
    const sugar = drink.nutrition.nutrients.find(n => n.name === "Sugar");

    // Parse Instructions
    let stepsHtml = drink.instructions[0].steps.map(s => `<li>${s.step}</li>`).join('');

    modalBody.innerHTML = `
        <h2 style="font-family:'Playfair Display'; color:var(--accent); font-size:2.2rem;">${drink.title}</h2>
        <div class="nutri-grid">
            <div class="nutri-tag">🔥 ${calories.amount} ${calories.unit}</div>
            <div class="nutri-tag">💪 ${protein.amount} ${protein.unit}</div>
            <div class="nutri-tag">🍭 ${sugar.amount} ${sugar.unit}</div>
        </div>

        <img src="${drink.images[3] || drink.images[0]}" class="modal-header-img" style="margin-top:20px; border-radius:15px;">
        
        <div class="recipe-section">
            <h3>The Mix</h3>
            <ul style="columns:2;">
                ${drink.ingredients.map(ing => `<li>${ing.original}</li>`).join('')}
            </ul>
        </div>

        <div class="recipe-section">
            <h3>Method</h3>
            <ol style="line-height:1.6; color:#475569;">
                ${stepsHtml}
            </ol>
        </div>
        
        <div style="background:#f8fafc; padding:15px; border-radius:10px; font-size:0.85rem; margin-top:20px; color:#64748b;">
            <strong>Pro Tip:</strong> Best served in a ${drink.glass_type}.
        </div>
    `;

    document.getElementById('recipe-modal').style.display = 'block';
}
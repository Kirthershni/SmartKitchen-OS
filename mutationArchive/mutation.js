let currentStrain = 'hostel';

const mutationMatrix = {
    hostel: {
        "Beef": "Soya Chunks 📦",
        "Butter": "Local Oil 🛢️",
        "Cream": "Milk Powder 🥛",
        "Wine": "Vinegar + Water 🧪",
        multiplier: 1 / 3, // Logic: Divide by 3
        color: "#facc15", 
        note: "Hostel Ration Applied: All quantities divided by 3. Oven replaced with Kettle."
    },
    quick: {
        "Onion": "Onion Powder 🧅",
        "Garlic": "Garlic Paste 🧄",
        "Dough": "Ready-made Crust 🍕",
        multiplier: 1 / 2, // Logic: Divide by 2
        color: "#3b82f6", 
        note: "Quick Mode: Portion sizes halved for faster cook times."
    },
    rich: {
        "Chicken": "Truffle Poultry 💎",
        "Water": "Champagne 🥂",
        "Salt": "Himalayan Gold 🧂",
        multiplier: 1.5, // Logic: Scale 1.5x
        color: "#10b981", 
        note: "Rich Mode: Quantity boosted by 50% for premium indulgence."
    }
};

// HELPER: Recalculate numbers found in strings (e.g. "1.5 cups" -> "0.5 cups")
function scaleMeasure(str, factor) {
    if (!str) return "";
    return str.replace(/(\d+(\.\d+)?)/g, (match) => {
        const num = parseFloat(match);
        const result = num * factor;
        // Clean rounding: 1.3333 -> 1.33 | 1.00 -> 1
        return result % 1 === 0 ? result : result.toFixed(2);
    });
}

function setStrain(strain) {
    currentStrain = strain;
    document.querySelectorAll('.strain-chip').forEach(c => c.classList.remove('active'));
    document.getElementById(`${strain}-strain`).classList.add('active');
}

async function fetchBaseForMutation() {
    const term = document.getElementById('mutation-search').value;
    const grid = document.getElementById('mutation-results');
    if (!term) return;

    grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: white;'>DECODING BASE DNA...</p>";

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await res.json();
    
    if (!data.meals) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: white;'>NO DATA FOUND.</p>";
        return;
    }

    grid.innerHTML = data.meals.slice(0, 8).map(meal => `
        <div class="recipe-card" onclick="applyMutation('${meal.idMeal}')">
            <img src="${meal.strMealThumb}">
            <div class="card-info" style="padding: 20px;">
                <h3>${meal.strMeal}</h3>
                <p style="color: ${mutationMatrix[currentStrain].color}; font-weight: 600;">
                    Scale to ${currentStrain.toUpperCase()} 🧪
                </p>
            </div>
        </div>
    `).join('');
}

async function applyMutation(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];
    const strainConfig = mutationMatrix[currentStrain];

    let mutatedList = "";
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ing && ing.trim() !== "") {
            // Apply Swaps from Matrix
            const match = Object.keys(strainConfig).find(k => ing.toLowerCase().includes(k.toLowerCase()));
            const finalIng = match ? strainConfig[match] : ing;
            
            // Apply Math Scaling to Measure
            const scaledMeasure = scaleMeasure(measure, strainConfig.multiplier);
            
            mutatedList += `<li><span class="mutated-qty" style="color:${strainConfig.color}">${scaledMeasure}</span> ${finalIng}</li>`;
        }
    }

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2 style="font-family:'Orbitron'; color:${strainConfig.color}; font-size:2rem;">${currentStrain.toUpperCase()} MUTATION</h2>
        <p style="margin-bottom: 10px; color:#94a3b8;">Original: ${meal.strMeal}</p>
        <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px; font-size:0.85rem; color:#cbd5e1; margin-bottom:20px; border-left: 4px solid ${strainConfig.color};">
            ${strainConfig.note}
        </div>
        
        <img src="${meal.strMealThumb}" class="modal-header-img" style="filter: saturate(1.3) contrast(1.1); border: 2px solid ${strainConfig.color};">
        
        <div class="recipe-section">
            <h3 style="color:${strainConfig.color};">Scaled Ingredients</h3>
            <ul style="columns: 2; list-style: none; padding:0;">${mutatedList}</ul>
        </div>
        <div class="recipe-section">
            <h3 style="color:${strainConfig.color};">Adapted Instructions</h3>
            <p style="white-space:pre-line; color:#94a3b8; line-height:1.6;">
                ${meal.strInstructions.replace(/oven|stove/gi, "Induction/Kettle")}
            </p>
        </div>
    `;
    document.getElementById('recipe-modal').style.display = 'block';
}

document.getElementById('mutation-search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchBaseForMutation();
    }
});
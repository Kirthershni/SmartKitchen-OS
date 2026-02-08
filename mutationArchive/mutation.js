let currentStrain = 'hostel';

const mutationMatrix = {
    hostel: {
        "Beef": "Soya Chunks 📦",
        "Butter": "Local Oil 🛢️",
        "Cream": "Milk Powder 🥛",
        "Wine": "Vinegar + Water 🧪",
        "Gourmet": "Instant",
        color: "#facc15", // Yellow for Hostel
        note: "Oven/Stove replaced with Electric Kettle & Induction."
    },
    rich: {
        "Chicken": "Truffle Glazed Poultry 🍗💎",
        "Water": "Champagne 🥂",
        "Salt": "Himalayan Pink Gold 🧂",
        "Oil": "Pure Ghee / Wagyu Fat 🧈",
        color: "#10b981", // Green for Wealth
        note: "Ingredients swapped for premium organic imports."
    },
    quick: {
        "Slow-cook": "Microwave for 5 mins ⚡",
        "Onion": "Onion Powder 🧅",
        "Garlic": "Garlic Paste 🧄",
        "Dough": "Ready-made Crust 🍕",
        color: "#3b82f6", // Blue for Speed
        note: "Prep time reduced by 70% using pre-made bases."
    }
};

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
                <p style="color: #a855f7; font-weight: 600;">Mutate to ${currentStrain.toUpperCase()} 🧬</p>
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
        if (ing && ing.trim() !== "") {
            const match = Object.keys(strainConfig).find(k => ing.includes(k));
            const finalIng = match ? strainConfig[match] : ing;
            mutatedList += `<li>${finalIng} - ${meal[`strMeasure${i}`]}</li>`;
        }
    }

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2 style="font-family:'Orbitron'; color:${strainConfig.color}; font-size:2rem;">${currentStrain.toUpperCase()} VARIANT</h2>
        <p style="margin-bottom: 10px;">Base Subject: ${meal.strMeal}</p>
        <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px; font-size:0.85rem; color:#94a3b8; margin-bottom:20px;">
            ${strainConfig.note}
        </div>
        
        <img src="${meal.strMealThumb}" class="modal-header-img" style="filter: saturate(1.5) contrast(1.1);">
        
        <div class="recipe-section">
            <h3 style="color:${strainConfig.color};">Mutation Ingredients</h3>
            <ul style="columns: 2;">${mutatedList}</ul>
        </div>
        <div class="recipe-section">
            <h3 style="color:${strainConfig.color};">Adapted Instructions</h3>
            <p style="white-space:pre-line;">${meal.strInstructions.replace(/oven|stove/gi, "Induction/Kettle")}</p>
        </div>
    `;
    document.getElementById('recipe-modal').style.display = 'block';
}

// Configuration for Mood Mapping
const moodMap = {
    happy: { type: 'category', value: 'Dessert', heading: "Sweet Treats for Your Happy Mood! 🍬" },
    angry: { type: 'category', value: 'Beef', heading: "Spicy & Bold Flavors for the Fire! 🔥" },
    sad: { type: 'category', value: 'Pasta', heading: "Warm Comfort for a Heavy Heart ☁️" },
    tired: { type: 'category', value: 'Side', heading: "Quick Bites for a Tired Soul 😴" }
};

document.addEventListener('DOMContentLoaded', () => {
    // Mood of the Day: Pick a random mood on load
    const moods = Object.keys(moodMap);
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    fetchMood(randomMood);
});

async function fetchMood(mood) {
    const config = moodMap[mood];
    const grid = document.getElementById('mood-results');
    grid.innerHTML = "<p style='grid-column: 1/-1;'>Tuning the vibe...</p>";

    // Updated URL logic to ensure results for 'Angry'
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${config.value}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        renderMoodRecipes(data.meals.slice(0, 12), config.heading);
    } catch (err) {
        grid.innerHTML = "<p>The studio is offline. Try again later!</p>";
    }
}

function renderMoodRecipes(meals, title) {
    const grid = document.getElementById('mood-results');
    grid.innerHTML = `
        <div style="grid-column: 1/-1; margin-bottom: 20px;">
            <h2 style="font-size: 1.8rem; color: var(--bg-dark);">${title}</h2>
            <div class="underline" style="margin: 10px 0; width: 60px; height: 4px; background: var(--accent);"></div>
        </div>
    `;

    meals.forEach(meal => {
        grid.innerHTML += `
            <div class="recipe-card" onclick="openModal('${meal.idMeal}')">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-info" style="padding: 20px;">
                    <h3 style="font-size: 1.1rem;">${meal.strMeal}</h3>
                </div>
            </div>
        `;
    });
}

// --- MODAL LOGIC (Identical to Main & DNA Lab) ---
async function openModal(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    const modalBody = document.getElementById('modal-body');
    
    let ingredients = "";
    for(let i=1; i<=20; i++) {
        const ing = meal[`strIngredient${i}`];
        if(ing && ing.trim() !== "") {
            ingredients += `<li>${ing} - ${meal[`strMeasure${i}`]}</li>`;
        }
    }

    modalBody.innerHTML = `
        <h2 style="font-family:'Playfair Display'; font-size:2.5rem; margin-bottom:15px;">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" style="width:100%; height:350px; object-fit:cover; border-radius:20px; margin-bottom:20px;">
        <div class="recipe-section">
            <h3 style="color:var(--accent); margin-bottom:10px;">Ingredients</h3>
            <ul style="columns: 2; margin-bottom: 25px;">${ingredients}</ul>
        </div>
        <div class="recipe-section">
            <h3 style="color:var(--accent); margin-bottom:10px;">Instructions</h3>
            <p style="white-space:pre-line; line-height:1.6; color: #334155;">${meal.strInstructions}</p>
        </div>
    `;
    document.getElementById('recipe-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
}

// Listen for Escape key
window.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });

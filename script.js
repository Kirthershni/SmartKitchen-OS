document.addEventListener('DOMContentLoaded', () => {
    searchRecipes("Rice"); // Default load
    
    // Check for saved mood preference
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) changeMood(savedMood, false);
});

// --- MOOD SYSTEM WITH VOICE ---
function speakMood(message) {
    // Check if the browser supports Speech Synthesis
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech so they don't overlap
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1; // Speed of speech
        utterance.pitch = 1.1; // Slightly higher pitch for a "friendly AI" feel
        window.speechSynthesis.speak(utterance);
    }
}

function changeMood(mood, showNotify = true) {
    const root = document.documentElement;
    const statusBox = document.getElementById('mood-status');
    
    const config = {
        'happy': { bg: '#fefce8', accent: '#eab308', sidebar: '#854d0e', label: 'Happy' },
        'sad':   { bg: '#eff6ff', accent: '#3b82f6', sidebar: '#1e3a8a', label: 'Sad' },
        'lazy':  { bg: '#fdf2f8', accent: '#ec4899', sidebar: '#831843', label: 'Lazy' }, // Updated to Pink
        'angry': { bg: '#fef2f2', accent: '#ef4444', sidebar: '#7f1d1d', label: 'Angry' },
        'reset': { bg: '#f1f5f9', accent: '#a855f7', sidebar: '#4840a1', label: 'Default' }
    };

    const choice = config[mood];
    const message = `System Optimized for ${choice.label} Mood`;

    // Apply Style Changes
    root.style.setProperty('--gray-bg', choice.bg);
    root.style.setProperty('--accent', choice.accent);
    root.style.setProperty('--sidebar-color', choice.sidebar);

    // Notification Logic
    if (showNotify && statusBox) {
        // 1. Show the text notification
        statusBox.innerText = message;
        statusBox.style.color = choice.accent;
        statusBox.style.background = `${choice.accent}20`;
        statusBox.classList.add('show');

        // 2. Trigger the Voice
        speakMood(message);

        setTimeout(() => {
            statusBox.classList.remove('show');
        }, 3000);
    }

    localStorage.setItem('userMood', mood);
}
// --- RECIPE LOGIC ---
async function searchRecipes(customTerm = null) {
    const query = customTerm || document.getElementById('main-search').value;
    const grid = document.getElementById('recipe-grid');

    if (!query) return;

    grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Searching for flavors...</p>";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        renderRecipes(data.meals);
    } catch (error) {
        grid.innerHTML = "<p>Error connecting to API.</p>";
    }
}

function renderRecipes(meals) {
    const grid = document.getElementById('recipe-grid');
    if (!meals) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No recipes found.</p>";
        return;
    }
    grid.innerHTML = meals.map(meal => `
        <div class="recipe-card" onclick="openModal('${meal.idMeal}')">
            <img src="${meal.strMealThumb}">
            <div style="padding:20px;">
                <h3 style="color:var(--bg-dark);">${meal.strMeal}</h3>
                <p style="color:#64748b; font-size:0.85rem;">${meal.strCategory} | ${meal.strArea}</p>
            </div>
        </div>
    `).join('');
}

// --- MODAL LOGIC ---
async function openModal(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    const modalBody = document.getElementById('modal-body');
    let ingredients = "";
    for(let i=1; i<=20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients += `<li><strong>${meal[`strIngredient${i}`]}</strong>: ${meal[`strMeasure${i}`]}</li>`;
        }
    }

    modalBody.innerHTML = `
        <h2 style="font-family:'Playfair Display'; font-size:2.5rem; margin-bottom:20px;">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" class="modal-header-img">
        <div class="recipe-section">
            <h3 style="border-left:5px solid var(--accent); padding-left:15px; margin-bottom:15px;">Ingredients</h3>
            <ul style="columns: 2;">${ingredients}</ul>
        </div>
        <div class="recipe-section" style="margin-top:30px;">
            <h3 style="border-left:5px solid var(--accent); padding-left:15px; margin-bottom:15px;">Instructions</h3>
            <p style="white-space:pre-line; line-height:1.8;">${meal.strInstructions}</p>
        </div>
    `;
    
    document.getElementById('recipe-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
window.onclick = (e) => { if (e.target.className === 'modal') closeModal(); };
document.getElementById('main-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchRecipes();
});

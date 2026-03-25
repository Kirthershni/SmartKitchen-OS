// --- 1. CONFIGURATION & MOOD MAPPING ---
const moodMap = {
    happy: { value: 'Dessert', heading: "Sweet Treats for Your Happy Mood! 🍬" },
    angry: { value: 'Beef', heading: "Spicy & Bold Flavors for the Fire! 🔥" },
    sad:   { value: 'Pasta', heading: "Warm Comfort for a Heavy Heart ☁️" },
    lazy:  { value: 'Side', heading: "Quick Bites for a Tired Soul 😴" }
};

// --- 2. THE GLOBAL BRIDGE (Called by Sidebar) ---
window.changeMood = function(moodKey) {
    fetchMood(moodKey);
};

// --- 3. MOOD & SOULFUL VOICE ENGINE ---
function applyStudioMood(moodKey) {
    const statusText = document.querySelector('.studio-header p');
    const logoSpan = document.querySelector('.logo span');
    
    const moodPalette = {
        'happy': { 
            bg: '#fefce8', accent: '#eab308', sidebar: '#854d0e', 
            voice: "Vibe check complete. Energy is radiant. Matching your soul with something sweet and sun-kissed.",
            display: "Radiant energy detected. Curating sunshine..."
        },
        'angry': { 
            bg: '#fef2f2', accent: '#ef4444', sidebar: '#7f1d1d', 
            voice: "Intensity detected. Channeling that fire into bold, powerful flavors that demand respect.",
            display: "Bold fire detected. Tuning into the heat..."
        },
        'sad': { 
            bg: '#eff6ff', accent: '#3b82f6', sidebar: '#1e3a8a', 
            voice: "The atmosphere is soft. Curating a menu of warm, quiet comforts to embrace your heart.",
            display: "Soft atmosphere detected. Finding comfort..."
        },
        'lazy': { 
            bg: '#fdf2f8', accent: '#ec4899', sidebar: '#831843', 
            voice: "Low-frequency mode activated. Finding effortless, beautiful bites for a slow-paced soul.",
            display: "Slow frequency detected. Simplifying the vibe..."
        },
        'reset': { 
            bg: '#f1f5f9', accent: '#a855f7', sidebar: '#4840a1', 
            voice: "Mood Studio frequency reset to default baseline.",
            display: "How are you feeling? We'll match a recipe to your soul."
        }
    };

    const theme = moodPalette[moodKey] || moodPalette['reset'];

    // Save mood for persistence across Gourmet Hub
    localStorage.setItem('userMood', moodKey);

    // Apply Mood Colors to CSS Variables
    document.documentElement.style.setProperty('--mood-bg', theme.bg);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--mood-sidebar', theme.sidebar);

    // Force Background Updates
    document.body.style.backgroundColor = theme.bg;
    const wrapper = document.querySelector('.main-wrapper');
    if (wrapper) wrapper.style.backgroundColor = theme.bg;

    // Update Header Text & Colors
    if (statusText) {
        statusText.innerText = theme.display;
        statusText.style.color = (moodKey === 'reset') ? "#64748b" : theme.sidebar;
    }
    
    if (logoSpan) {
        logoSpan.style.transition = "color 0.5s ease";
        logoSpan.style.color = theme.accent;
    }

    // Trigger Artistic Voice
    speak(theme.voice);
}

// --- 4. VOICE SYNTHESIS ---
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }
}

// --- 5. RECIPE FETCHING LOGIC ---
async function fetchMood(mood) {
    // 1. Change UI colors and trigger voice
    applyStudioMood(mood);

    const config = moodMap[mood] || moodMap['happy'];
    const grid = document.getElementById('mood-results');
    grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center; font-style:italic;'>Tuning the frequency...</p>";

    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${config.value}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.meals) {
            renderMoodRecipes(data.meals.slice(0, 12), config.heading);
        } else {
            grid.innerHTML = "<p>The vibe is empty. Try another mood.</p>";
        }
    } catch (err) {
        grid.innerHTML = "<p>The studio is offline. Try again later!</p>";
    }
}

function renderMoodRecipes(meals, title) {
    const grid = document.getElementById('mood-results');
    grid.innerHTML = `
        <div style="grid-column: 1/-1; margin-bottom: 30px;">
            <h2 style="font-size: 1.8rem; font-family: 'Playfair Display', serif;">${title}</h2>
            <div class="underline" style="margin: 10px 0; width: 60px; height: 4px; background: var(--accent); border-radius: 2px;"></div>
        </div>
    `;

    meals.forEach(meal => {
        grid.innerHTML += `
            <div class="recipe-card" onclick="openModal('${meal.idMeal}')">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-info">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        `;
    });
}

// --- 6. MODAL LOGIC ---
async function openModal(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    const modalBody = document.getElementById('modal-body');
    
    let ingredients = "";
    for(let i=1; i<=20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if(ing && ing.trim() !== "") {
            ingredients += `<li>${ing} <span style="color: #94a3b8;">(${measure})</span></li>`;
        }
    }

    modalBody.innerHTML = `
        <h2 style="font-family:'Playfair Display'; font-size:2.5rem; margin-bottom:15px; color: var(--accent);">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" style="width:100%; height:350px; object-fit:cover; border-radius:20px; margin-bottom:20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        
        <div class="recipe-section">
            <h3 style="color:var(--accent); margin-bottom:12px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Soulful Ingredients</h3>
            <ul style="columns: 2; margin-bottom: 25px; list-style-type: none; padding: 0;">${ingredients}</ul>
        </div>

        <div class="recipe-section">
            <h3 style="color:var(--accent); margin-bottom:12px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Creation Steps</h3>
            <p style="white-space:pre-line; line-height:1.7; color: #475569; font-size: 0.95rem;">${meal.strInstructions}</p>
        </div>
    `;
    document.getElementById('recipe-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
    window.speechSynthesis.cancel(); 
}

// --- 7. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if a mood was already set in another page
    const savedMood = localStorage.getItem('userMood') || 'happy';
    fetchMood(savedMood);
});

// Utility: Close modal on outside click
window.onclick = (e) => { 
    if (e.target == document.getElementById('recipe-modal')) closeModal(); 
};
window.addEventListener('keydown', (e) => { 
    if (e.key === "Escape") closeModal(); 
});

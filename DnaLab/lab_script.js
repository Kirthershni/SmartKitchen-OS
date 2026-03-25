// --- 1. THE GLOBAL BRIDGE (Connects Sidebar to DNA Lab) ---
window.changeMood = function(mood) {
    applyDNAMood(mood);
};

// --- 2. MOOD LOGIC (With High-Tech DNA Wording) ---
function applyDNAMood(moodKey) {
    const statusDiv = document.getElementById('mood-status');
    const dnaSpan = document.querySelector('.logo span');
    
    const moodPalette = {
        'happy': { 
            bg: '#fefce8', accent: '#eab308', sidebar: '#854d0e', 
            voice: "DNA Scanner online. Energy levels optimal for high-performance molecular cooking!" 
        },
        'sad': { 
            bg: '#eff6ff', accent: '#3b82f6', sidebar: '#1e3a8a', 
            voice: "Scanning for comfort-focused genetic markers. Let's find something soothing for the soul." 
        },
        'lazy': { 
            bg: '#fdf2f8', accent: '#ec4899', sidebar: '#831843', 
            voice: "Efficiency mode activated. Searching for quick-synthesis molecular meals with minimal effort." 
        },
        'angry': { 
            bg: '#fef2f2', accent: '#ef4444', sidebar: '#7f1d1d', 
            voice: "High-intensity metabolic search initiated. Analyzing bold and powerful flavor profiles." 
        },
        'reset': { 
            bg: '#f1f5f9', accent: '#a855f7', sidebar: '#4840a1', 
            voice: "DNA Lab reset to default diagnostic baseline. All markers cleared." 
        }
    };

    const theme = moodPalette[moodKey] || moodPalette['reset'];

    // Sync mood across your Gourmet Hub
    localStorage.setItem('userMood', moodKey);

    // Apply Mood Colors to CSS Variables
    document.documentElement.style.setProperty('--mood-bg', theme.bg);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--mood-sidebar', theme.sidebar);

    // Force Background Updates
    document.body.style.backgroundColor = theme.bg;
    const mainWrapper = document.querySelector('.main-wrapper');
    if (mainWrapper) mainWrapper.style.backgroundColor = theme.bg;

    // Update UI Text
    if (statusDiv) {
        if (moodKey === 'reset') {
            statusDiv.innerText = "Analyze your pantry's genetic potential.";
            statusDiv.style.color = "#64748b";
        } else {
            statusDiv.innerText = `System optimized for ${moodKey} mood`;
            statusDiv.style.color = theme.sidebar;
        }
    }

    if (dnaSpan) {
        dnaSpan.style.transition = "color 0.5s ease";
        dnaSpan.style.color = theme.accent;
    }

    // Trigger AI Lab Voice
    speak(theme.voice);
}

// --- 3. VOICE ENGINE ---
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95; 
        utterance.pitch = 1.2; // Higher pitch for the "Lab AI" feel
        window.speechSynthesis.speak(utterance);
    }
}

// --- 4. MAIN SEARCH LOGIC (Your Recipe API Code) ---
async function runDNALab() {
    const input = document.getElementById('fridge-input').value.toLowerCase();
    const fridgeItems = input.split(',').map(i => i.trim()).filter(i => i !== "");
    const grid = document.getElementById('lab-results');

    if (fridgeItems.length === 0) {
        speak("Please input ingredients to begin genetic analysis.");
        return alert("Please select or type ingredients!");
    }

    grid.innerHTML = "<p>Analyzing DNA markers...</p>";

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${fridgeItems[0]}`);
        const data = await res.json();
        
        if (!data.meals) {
            grid.innerHTML = "<p>No genetic matches found.</p>";
            speak("Scanning complete. Zero genetic matches detected in the database.");
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
        speak(`Scan successful. Found ${detailedMeals.length} potential molecular sequences.`);
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

// --- 5. MODAL & UTILITIES ---
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
    speak("DNA marker sequence cleared.");
}

// --- 6. AUTO-INIT ---
document.addEventListener('DOMContentLoaded', () => {
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) applyDNAMood(savedMood);
});

window.onclick = (e) => { if (e.target == document.getElementById('recipe-modal')) closeModal(); };
window.addEventListener('keydown', (e) => { if (e.key === "Escape") closeModal(); });

document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    scanFoodDNA("Beef");
    
    // Check for saved mood
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) changeMood(savedMood);
});

// --- MOOD SYSTEM (Requested 5 Colors) ---
function changeMood(mood) {
    const root = document.documentElement;
    const statusBox = document.getElementById('mood-status');
    
    const config = {
        'happy': { bg: '#fefce8', accent: '#facc15', sidebar: '#854d0e', label: 'Happy' }, // Yellow
        'sad':   { bg: '#eff6ff', accent: '#3b82f6', sidebar: '#1e3a8a', label: 'Sad' },   // Blue
        'lazy':  { bg: '#fdf2f8', accent: '#f472b6', sidebar: '#831843', label: 'Lazy' },  // Pink
        'angry': { bg: '#fef2f2', accent: '#ef4444', sidebar: '#7f1d1d', label: 'Angry' }, // Red
        'reset': { bg: '#f8fafc', accent: '#a855f7', sidebar: '#4840a1', label: 'Default' } // Purple
    };

    const choice = config[mood];
    
    // Apply Colors
    root.style.setProperty('--bg-light', choice.bg);
    root.style.setProperty('--accent', choice.accent);
    root.style.setProperty('--sidebar-color', choice.sidebar);

    // Show Notification
    if (statusBox) {
        statusBox.innerText = `System Optimized: ${choice.label}`;
        statusBox.style.background = choice.accent + "20";
        statusBox.style.color = choice.accent;
        statusBox.style.display = "block";
        setTimeout(() => { statusBox.style.display = "none"; }, 3000);
    }

    localStorage.setItem('userMood', mood);
}

// --- SCANNER LOGIC ---
async function scanFoodDNA(term) {
    const query = term || document.getElementById('cal-search').value;
    const grid = document.getElementById('calorie-grid');
    if (!query) return;

    grid.innerHTML = "<div style='grid-column: 1/-1; text-align:center;'>🧬 Analyzing Molecular Structure...</div>";

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        
        if (data.meals) {
            renderCalorieCards(data.meals);
        } else {
            grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No Genetic Matches Found.</p>";
        }
    } catch (e) {
        grid.innerHTML = "<p>Scanner Error: Database Link Interrupted.</p>";
    }
}

function renderCalorieCards(meals) {
    const grid = document.getElementById('calorie-grid');
    grid.innerHTML = meals.map(meal => {
        const calories = (parseInt(meal.idMeal) % 500) + 300; 
        return `
            <div class="cal-card" onclick="viewFullAnalysis('${meal.idMeal}')">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-info">
                    <p style="font-size:0.7rem; color:#94a3b8; font-weight:700; text-transform:uppercase; margin-bottom:5px;">Molecular ID: ${meal.idMeal}</p>
                    <h3 style="font-family:'Playfair Display', serif; font-size:1.4rem;">${meal.strMeal}</h3>
                    <div class="macros-strip">
                        <span>🔥 ${calories} kcal</span>
                        <span>P: ${Math.floor(calories/20)}g</span>
                        <span>C: ${Math.floor(calories/10)}g</span>
                        <span>F: ${Math.floor(calories/45)}g</span>
                    </div>
                </div>
            </div>`;
    }).join('');
}

// Reuse your viewFullAnalysis logic but ensure the CSS classes match the new panel style
async function viewFullAnalysis(id) {
    // ... (Keep your existing function here, just ensure the back-button 
    // re-renders the grid or reloads the scan DNA view)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // You can also use: location.reload() inside the back button of analysis report.
}

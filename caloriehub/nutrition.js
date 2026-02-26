document.addEventListener('DOMContentLoaded', () => {
    scanFoodDNA("Beef");
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) changeMood(savedMood);
});

// --- MOOD SYSTEM ---
function changeMood(mood) {
    const root = document.documentElement;
    const config = {
        'happy': { bg: '#fefce8', accent: '#facc15', sidebar: '#854d0e' }, // Yellow
        'sad':   { bg: '#eff6ff', accent: '#3b82f6', sidebar: '#1e3a8a' }, // Blue
        'lazy':  { bg: '#fdf2f8', accent: '#f472b6', sidebar: '#831843' }, // Pink
        'angry': { bg: '#fef2f2', accent: '#ef4444', sidebar: '#7f1d1d' }, // Red
        'reset': { bg: '#f8fafc', accent: '#a855f7', sidebar: '#4840a1' }  // Purple
    };

    const choice = config[mood];
    root.style.setProperty('--bg-light', choice.bg);
    root.style.setProperty('--accent', choice.accent);
    root.style.setProperty('--sidebar-color', choice.sidebar);
    
    localStorage.setItem('userMood', mood);
}

// --- SCANNER LOGIC ---
async function scanFoodDNA(term) {
    const query = term || document.getElementById('cal-search').value;
    const grid = document.getElementById('calorie-grid');
    if (!query) return;

    grid.innerHTML = "<div style='grid-column: 1/-1; text-align:center;'>🧬 Analyzing DNA Signatures...</div>";

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        
        if (data.meals) {
            grid.innerHTML = data.meals.map(meal => {
                const cal = (parseInt(meal.idMeal) % 500) + 300; 
                return `
                    <div class="cal-card" onclick="viewFullAnalysis('${meal.idMeal}')">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="card-info">
                            <p style="font-size:0.7rem; color:#94a3b8; font-weight:700; text-transform:uppercase;">ID: ${meal.idMeal}</p>
                            <h3 style="font-family:'Playfair Display', serif; margin: 10px 0;">${meal.strMeal}</h3>
                            <div class="macros-strip">
                                <span>🔥 ${cal} kcal</span>
                                <span>P: ${Math.floor(cal/20)}g</span>
                                <span>C: ${Math.floor(cal/10)}g</span>
                            </div>
                        </div>
                    </div>`;
            }).join('');
        } else {
            grid.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>No DNA matches found.</p>";
        }
    } catch (e) {
        grid.innerHTML = "<p>Database offline.</p>";
    }
}

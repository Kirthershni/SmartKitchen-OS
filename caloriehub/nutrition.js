document.addEventListener('DOMContentLoaded', () => {
    // Initial data load
    scanFoodDNA("Beef");
    
    // Check main page's mood setting
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) changeMood(savedMood, false);
});

async function scanFoodDNA(term) {
    const query = term || document.getElementById('cal-search').value;
    const grid = document.getElementById('calorie-grid');
    if (!query || !grid) return;

    grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>🧬 Analyzing DNA Signatures...</p>";

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        
        if (data.meals) {
            grid.innerHTML = data.meals.map(meal => {
                const cal = (parseInt(meal.idMeal) % 500) + 300; 
                return `
                    <div class="recipe-card" style="background:white; border-radius:25px; overflow:hidden;">
                        <img src="${meal.strMealThumb}" style="width:100%; height:200px; object-fit:cover;">
                        <div style="padding:20px;">
                            <p style="font-size:0.7rem; color:#94a3b8; font-weight:700;">MOLECULAR ID: ${meal.idMeal}</p>
                            <h3 style="font-family:'Playfair Display'; margin: 10px 0;">${meal.strMeal}</h3>
                            <div style="display:flex; justify-content:space-between; color:var(--accent); font-weight:bold; font-size:0.8rem; border-top:1px solid #f1f5f9; pt:10px;">
                                <span>🔥 ${cal} kcal</span>
                                <span>P: ${Math.floor(cal/20)}g</span>
                                <span>C: ${Math.floor(cal/10)}g</span>
                            </div>
                        </div>
                    </div>`;
            }).join('');
        }
    } catch (e) { grid.innerHTML = "<p>Database Offline.</p>"; }
}

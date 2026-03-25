// --- 1. GLOBAL BRIDGE (Connects Sidebar to Time Warp) ---
window.changeMood = function(moodKey) {
    applyWarpMood(moodKey);
};

// --- 2. MOOD & VOICE PERSONALITY ENGINE ---
function applyWarpMood(moodKey) {
    const statusText = document.querySelector('.warp-header p');
    const logoSpan = document.querySelector('.logo span');
    
    const moodPalette = {
        'happy': { bg: '#fefce8', accent: '#eab308', sidebar: '#854d0e', voice: "System optimized for feeling happy" },
        'angry': { bg: '#fef2f2', accent: '#ef4444', sidebar: '#7f1d1d', voice: "System optimized for feeling angry" },
        'sad':   { bg: '#eff6ff', accent: '#3b82f6', sidebar: '#1e3a8a', voice: "System optimized for feeling sad" },
        'lazy':  { bg: '#fdf2f8', accent: '#ec4899', sidebar: '#831843', voice: "System optimized for feeling lazy" },
        'reset': { bg: '#f1f5f9', accent: '#a855f7', sidebar: '#4840a1', voice: "Time Warp system reset to default" }
    };

    const theme = moodPalette[moodKey] || moodPalette['reset'];

    // Sync across the Gourmet Hub
    localStorage.setItem('userMood', moodKey);

    // Apply Mood Colors to CSS Variables
    document.documentElement.style.setProperty('--mood-bg', theme.bg);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--mood-sidebar', theme.sidebar);

    // Force Background Updates
    document.body.style.backgroundColor = theme.bg;
    const wrapper = document.querySelector('.main-wrapper');
    if (wrapper) wrapper.style.backgroundColor = theme.bg;

    // Update Header Text & Logo
    if (statusText) {
        statusText.innerText = moodKey === 'reset' ? "Select a subject to begin voice-guided navigation." : `System optimized for feeling ${moodKey} mood`;
        statusText.style.color = theme.sidebar;
    }
    
    if (logoSpan) {
        logoSpan.style.transition = "color 0.5s ease";
        logoSpan.style.color = theme.accent;
    }

    // Trigger AI System Voice
    speakText(theme.voice);
}

// --- 3. VOICE ENGINE ---
function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        if (text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.pitch = 1.1; 
            utterance.rate = 0.95; 
            window.speechSynthesis.speak(utterance);
        }
    }
}

// --- 4. TIME WARP CORE LOGIC ---
let timeline = [];
let currentIdx = 0;

async function searchWarpSubjects() {
    const term = document.getElementById('warp-search').value;
    const grid = document.getElementById('selection-grid');
    const display = document.getElementById('warp-display');
    
    if (!term) return;

    display.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>Searching temporal data...</p>";

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        const data = await res.json();
        
        if (!data.meals) {
            grid.innerHTML = "<p style='grid-column:1/-1;'>No subjects found in the timeline.</p>";
            return;
        }

        grid.innerHTML = data.meals.map(meal => {
            const stepsCount = meal.strInstructions.split('.').length;
            const estTime = stepsCount * 5;

            return `
                <div class="recipe-card" style="position:relative;">
                    <div class="time-badge">🕒 ${estTime} MIN</div>
                    <img src="${meal.strMealThumb}" style="width:100%; height:180px; object-fit:cover; border-radius: 15px 15px 0 0;">
                    <div class="card-info" style="padding:15px; background: white; border-radius: 0 0 15px 15px;">
                        <h3 style="margin: 0; font-size: 1.1rem;">${meal.strMeal}</h3>
                        <button class="btn-start-warp" onclick="startTimeWarp('${meal.idMeal}')" style="background: var(--accent); width:100%; color:white; border:none; padding:10px; border-radius:8px; margin-top:10px; cursor:pointer; font-weight:600;">START COOKING</button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (err) {
        grid.innerHTML = "<p>Temporal link failed. Try again.</p>";
    }
}

async function startTimeWarp(id) {
    const grid = document.getElementById('selection-grid');
    const display = document.getElementById('warp-display');
    
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    // Build the Step-by-Step Timeline
    timeline = ["Let's prepare the ingredients."];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== "") {
            timeline.push(`Get ${measure} of ${ing}`);
        }
    }
    timeline.push("Preparation complete. Let's start cooking.");
    const steps = meal.strInstructions.split('.').map(s => s.trim()).filter(s => s.length > 5);
    timeline = [...timeline, ...steps];

    currentIdx = 0;
    grid.style.display = 'none';
    display.style.display = 'block';
    updateUI();
    speakText(timeline[currentIdx]);
}

function updateUI() {
    const display = document.getElementById('current-step-text');
    const counter = document.getElementById('step-counter');
    const bar = document.getElementById('timeline-progress');

    if (currentIdx >= timeline.length) {
        display.innerHTML = "<div style='text-align:center;'>🎉<br>DONE! GOOD JOB</div>";
        counter.innerText = "COMPLETE";
        bar.style.width = "100%";
        return;
    }

    display.innerText = timeline[currentIdx];
    counter.innerText = `PHASE ${currentIdx + 1} / ${timeline.length}`;
    bar.style.width = `${((currentIdx + 1) / timeline.length) * 100}%`;
}

function warpForward() {
    if (currentIdx < timeline.length) {
        currentIdx++;
        updateUI();
        if (currentIdx < timeline.length) {
            speakText(timeline[currentIdx]);
        } else {
            speakText("Done! Good job.");
        }
    }
}

function warpBack() {
    if (currentIdx > 0) {
        currentIdx--;
        updateUI();
        speakText(timeline[currentIdx]);
    }
}

function repeatSpeech() { 
    speakText(timeline[currentIdx]); 
}

function resetWarp() {
    document.getElementById('warp-display').style.display = 'none';
    document.getElementById('selection-grid').style.display = 'grid';
    window.speechSynthesis.cancel();
}

// --- 5. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const savedMood = localStorage.getItem('userMood') || 'reset';
    applyWarpMood(savedMood);
});

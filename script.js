document.addEventListener('DOMContentLoaded', () => {
    searchRecipes("Rice"); 
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) changeMood(savedMood, false);
});

// --- MOOD SYSTEM ---
function speakMood(message) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1; 
        window.speechSynthesis.speak(utterance);
    }
}

function changeMood(mood, showNotify = true) {
    const root = document.documentElement;
    const statusBox = document.getElementById('mood-status');
    const config = {
        'happy': { bg: '#fefce8', accent: '#eab308', sidebar: '#854d0e', label: 'Happy' },
        'sad':   { bg: '#eff6ff', accent: '#3b82f6', sidebar: '#1e3a8a', label: 'Sad' },
        'lazy':  { bg: '#fdf2f8', accent: '#ec4899', sidebar: '#831843', label: 'Lazy' },
        'angry': { bg: '#fef2f2', accent: '#ef4444', sidebar: '#7f1d1d', label: 'Angry' },
        'reset': { bg: '#f1f5f9', accent: '#a855f7', sidebar: '#4840a1', label: 'Default' }
    };
    const choice = config[mood];
    root.style.setProperty('--gray-bg', choice.bg);
    root.style.setProperty('--accent', choice.accent);
    root.style.setProperty('--sidebar-color', choice.sidebar);

    if (showNotify && statusBox) {
        statusBox.innerText = `System Optimized for ${choice.label} Mood`;
        statusBox.style.color = choice.accent;
        statusBox.style.background = `${choice.accent}20`;
        statusBox.classList.add('show');
        speakMood(statusBox.innerText);
        setTimeout(() => { statusBox.classList.remove('show'); }, 3000);
    }
    localStorage.setItem('userMood', mood);
}

// --- RECIPE LOGIC ---
async function searchRecipes(customTerm = null) {
    const query = customTerm || document.getElementById('main-search').value;
    const grid = document.getElementById('recipe-grid');
    if (!query) return;
    grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Searching...</p>";
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        renderRecipes(data.meals);
    } catch (error) { grid.innerHTML = "<p>Error connecting to API.</p>"; }
}

function renderRecipes(meals) {
    const grid = document.getElementById('recipe-grid');
    if (!meals) { grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No recipes found.</p>"; return; }
    grid.innerHTML = meals.map(meal => `
        <div class="recipe-card" onclick="openModal('${meal.idMeal}')">
            <img src="${meal.strMealThumb}">
            <div style="padding:20px;">
                <h3>${meal.strMeal}</h3>
                <p style="font-size:0.85rem; color:#64748b;">${meal.strCategory} | ${meal.strArea}</p>
            </div>
        </div>
    `).join('');
}

// --- MODAL & LOGIC ---
let currentSteps = [];
let currentIngredients = [];
let currentStepIndex = -1; 
let countdown;
let timeLeft = 0;
let isTimerRunning = false;
let recognition;

async function openModal(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    const modalBody = document.getElementById('modal-body');
    let ingredientsHTML = "";
    currentIngredients = [];

    for(let i=1; i<=20; i++) {
        if(meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== "") {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            currentIngredients.push({ name: ingredient, measure: measure });
            
            ingredientsHTML += `
                <li class="ingredient-item" onclick="toggleIngredient(this)" style="cursor:pointer; padding:12px; border-radius:12px; margin-bottom:8px; background:rgba(0,0,0,0.03); display:flex; align-items:center; gap:12px; transition: 0.3s; border: 1px solid transparent;">
                    <input type="checkbox" class="ing-check" style="width:20px; height:20px; pointer-events:none;">
                    <span><strong>${ingredient}</strong>: ${measure}</span>
                </li>`;
        }
    }

    const timeMatch = meal.strInstructions.match(/(\d+)\s*(min|minute|hour)/i);
    const suggestedTime = timeMatch ? timeMatch[1] : 30;

    currentSteps = meal.strInstructions
        .split(/[.\r\n]+/)
        .map(s => s.trim())
        .filter(s => s.length > 10 && !s.toLowerCase().includes("instructions"))
        .map(s => s.replace(/^(Step\s*\d+\s*:?|Step\s*\d+|^\d+\s*[\).:-])\s*/i, "").trim());

    currentStepIndex = -1; 

    modalBody.innerHTML = `
        <h2 style="font-family:'Playfair Display'; font-size:2.5rem; margin-bottom:20px;">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" class="modal-header-img">

        <div class="action-bar" style="display:flex; gap:10px; margin-bottom:25px; flex-wrap:wrap;">
            <button onclick="shareMissingIngredients('${meal.strMeal}')" style="background:#075E54; color:white; border:none; padding:12px; border-radius:12px; cursor:pointer; font-weight:600; flex:2;">Get Shopping List 🛒</button>
            <button onclick="closeModal()" style="background:var(--danger); color:white; border:none; padding:12px; border-radius:12px; cursor:pointer; font-weight:600; flex:1;">Close ✖</button>
        </div>

        <div class="recipe-section" id="prep-section">
            <h3 style="border-left:5px solid var(--accent); padding-left:15px; margin-bottom:15px;">What's in your fridge? 🧊</h3>
            <p style="font-size:0.9rem; color:#64748b; margin-bottom:15px;">Check what you <strong>HAVE</strong>. Anything left goes to WhatsApp.</p>
            <ul id="prep-list" style="padding:0; list-style:none;">${ingredientsHTML}</ul>
        </div>

        <div id="timer-section" style="margin-top:25px; background:white; border:2px solid var(--accent); padding:20px; border-radius:20px; text-align:center;">
            <h4 style="color:var(--accent); margin-bottom:10px;">⏳ Cooking Timer</h4>
            <div id="timer-display" style="font-size:2.5rem; font-weight:bold; margin-bottom:15px;">00:00</div>
            <div style="display:flex; gap:10px; justify-content:center; margin-bottom:15px;">
                <button onclick="setTimer(${suggestedTime})" style="background:var(--gray-bg); border:1px solid var(--accent); padding:8px; border-radius:10px; font-weight:600; color:var(--sidebar-color);">Auto: ${suggestedTime}m</button>
                <input type="number" id="custom-min" placeholder="Min" style="width:60px; border:1px solid #ccc; border-radius:8px; padding:5px;">
                <button onclick="setTimer(document.getElementById('custom-min').value)" style="background:var(--accent); color:white; border:none; padding:5px 10px; border-radius:8px;">Set</button>
            </div>
            <button id="timer-btn" onclick="toggleTimer()" style="background:var(--accent); color:white; border:none; padding:10px 25px; border-radius:20px; font-weight:bold;">Start Countdown</button>
        </div>

        <div id="ai-guide-box" style="margin-top:30px; background:white; padding:30px; border-radius:20px; border:2px solid var(--accent); text-align:center;">
            <h3 style="color:var(--accent); margin-bottom:15px;">Chef Assistant 👨‍🍳</h3>
            <div id="step-display" style="min-height:100px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <p id="step-text">Ready? Click Start or say <strong>"I'm ready"</strong>.</p>
            </div>
            <p id="voice-indicator" style="font-size:0.8rem; color:var(--accent); margin-top:10px; display:none;">🎤 Listening for "I'm ready"...</p>
            <div id="ai-controls" style="margin-top:20px; display:none; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button onclick="prevStep()" style="background:#64748b; color:white; border:none; padding:10px 20px; border-radius:10px;">⬅ Back</button>
                <button onclick="updateStepView()" style="background:var(--accent); color:white; border:none; padding:10px 20px; border-radius:10px; opacity:0.8;">Repeat 🔊</button>
                <button onclick="nextStep()" style="background:var(--accent); color:white; border:none; padding:10px 20px; border-radius:10px;">Next ➡</button>
            </div>
            <button id="ai-start-btn" onclick="activateVoiceTrigger()" style="margin-top:20px; background:var(--accent); color:white; border:none; padding:12px 30px; border-radius:30px; font-weight:600; cursor:pointer; width:100%;">Start Assistant</button>
        </div>
    `;
    
    document.getElementById('recipe-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// --- VOICE TRIGGER RESTORED ---
function activateVoiceTrigger() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { startAssistantManual(); return; }

    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    
    document.getElementById('ai-start-btn').innerText = "Mic Active... Say Ready!";
    document.getElementById('voice-indicator').style.display = "block";

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        if (command.includes("ready")) {
            recognition.stop(); 
            window.speechSynthesis.cancel();
            const greeting = new SpeechSynthesisUtterance("Great choice! Happy cooking!");
            greeting.onend = () => { startAssistantManual(); };
            window.speechSynthesis.speak(greeting);
        }
    };
    
    recognition.onerror = () => { startAssistantManual(); };
    recognition.start();
}

function startAssistantManual() {
    document.getElementById('ai-start-btn').style.display = "none";
    document.getElementById('voice-indicator').style.display = "none";
    document.getElementById('ai-controls').style.display = "flex";
    document.getElementById('prep-section').style.display = "none"; 
    currentStepIndex = 0;
    updateStepView();
}

function updateStepView() {
    const display = document.getElementById('step-text');
    if (currentStepIndex > 0) window.speechSynthesis.cancel();
    if (currentStepIndex < currentSteps.length) {
        display.innerHTML = `<span style="color:var(--accent); font-weight:bold; font-size:1.3rem; display:block; margin-bottom:5px;">STEP ${currentStepIndex + 1}</span>${currentSteps[currentStepIndex]}`;
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(currentSteps[currentStepIndex]));
    } else {
        display.innerHTML = "<strong>🎉 Done!</strong>";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Recipe complete!"));
    }
}

function nextStep() { if (currentStepIndex < currentSteps.length - 1) { currentStepIndex++; updateStepView(); } else { currentStepIndex = currentSteps.length; updateStepView(); } }
function prevStep() { if (currentStepIndex > 0) { currentStepIndex--; updateStepView(); } }

// --- TIMER LOGIC RESTORED ---
function setTimer(m) { if(!m) return; timeLeft = m * 60; updateTimerDisplay(); }
function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const display = document.getElementById('timer-display');
    if(display) display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
function toggleTimer() {
    const btn = document.getElementById('timer-btn');
    if (isTimerRunning) { clearInterval(countdown); isTimerRunning = false; btn.innerText = "Resume"; }
    else {
        if(timeLeft <= 0) return;
        isTimerRunning = true; btn.innerText = "Pause";
        countdown = setInterval(() => { timeLeft--; updateTimerDisplay(); if (timeLeft <= 0) { clearInterval(countdown); timerFinished(); } }, 1000);
    }
}
function timerFinished() {
    new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("Time is up!"));
    alert("⏰ Time is up!");
}

function resetTimer() { clearInterval(countdown); timeLeft = 0; isTimerRunning = false; updateTimerDisplay(); document.getElementById('timer-btn').innerText = "Start Countdown"; }
function closeModal() { resetTimer(); window.speechSynthesis.cancel(); if(recognition) recognition.stop(); document.getElementById('recipe-modal').style.display = 'none'; document.body.style.overflow = 'auto'; }

// --- CHECKLIST & SMART SHOPPING ---
function toggleIngredient(el) {
    const cb = el.querySelector('input');
    cb.checked = !cb.checked;
    if (cb.checked) {
        el.style.background = "#dcfce7";
        el.style.borderColor = "#22c55e";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Got it!"));
    } else {
        el.style.background = "rgba(0,0,0,0.03)";
        el.style.borderColor = "transparent";
    }
}

function shareMissingIngredients(mealName) {
    const allItems = document.querySelectorAll('.ingredient-item');
    let missing = [];
    allItems.forEach(item => {
        if (!item.querySelector('input').checked) missing.push(item.innerText.trim());
    });
    if (missing.length === 0) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("You have everything with you! Let's begin."));
        alert("✅ You have everything!");
    } else {
        const text = `🛒 *Shopping List for ${mealName}*:\n\nMissing:\n- ${missing.join('\n- ')}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
}

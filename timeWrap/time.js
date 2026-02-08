let timeline = [];
let currentIdx = 0;
const synth = window.speechSynthesis;

async function searchWarpSubjects() {
    const term = document.getElementById('warp-search').value;
    const grid = document.getElementById('selection-grid');
    const display = document.getElementById('warp-display');
    
    if (!term) return;

    display.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = "<p style='grid-column:1/-1;'>Searching temporal data...</p>";

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await res.json();
    
    if (!data.meals) {
        grid.innerHTML = "<p style='grid-column:1/-1;'>No subjects found.</p>";
        return;
    }

    grid.innerHTML = data.meals.map(meal => {
        // Mock time based on number of steps (approx 5 mins per step)
        const stepsCount = meal.strInstructions.split('.').length;
        const estTime = stepsCount * 5;

        return `
            <div class="recipe-card" style="position:relative;">
                <div class="time-badge">🕒 ${estTime} MIN</div>
                <img src="${meal.strMealThumb}" style="width:100%; height:180px; object-fit:cover;">
                <div class="card-info" style="padding:15px;">
                    <h3>${meal.strMeal}</h3>
                    <button class="btn-start-warp" onclick="startTimeWarp('${meal.idMeal}')">START COOKING</button>
                </div>
            </div>
        `;
    }).join('');
}

async function startTimeWarp(id) {
    const grid = document.getElementById('selection-grid');
    const display = document.getElementById('warp-display');
    
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    // Build the Timeline: Ingredients first, then Instructions
    timeline = ["Let's prepare the ingredients."];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        if (ing && ing.trim() !== "") timeline.push(`Get ${meal[`strMeasure${i}`]} of ${ing}`);
    }
    timeline.push("Preparation complete. Let's start cooking.");
    const steps = meal.strInstructions.split('.').map(s => s.trim()).filter(s => s.length > 5);
    timeline = [...timeline, ...steps];

    currentIdx = 0;
    grid.style.display = 'none';
    display.style.display = 'block';
    updateUI();
    speak();
}

function updateUI() {
    const display = document.getElementById('current-step-text');
    const counter = document.getElementById('step-counter');
    const bar = document.getElementById('timeline-progress');

    if (currentIdx >= timeline.length) {
        display.innerHTML = "🎉<br>DONE! GOOD JOB";
        counter.innerText = "COMPLETE";
        bar.style.width = "100%";
        return;
    }

    display.innerText = timeline[currentIdx];
    counter.innerText = `PHASE ${currentIdx + 1} / ${timeline.length}`;
    bar.style.width = `${((currentIdx + 1) / timeline.length) * 100}%`;
}

function speak() {
    synth.cancel();
    if (timeline[currentIdx]) {
        const utterance = new SpeechSynthesisUtterance(timeline[currentIdx]);
        utterance.pitch = 1.1; utterance.rate = 1.0;
        synth.speak(utterance);
    }
}

function warpForward() {
    if (currentIdx < timeline.length) {
        currentIdx++;
        updateUI();
        if (currentIdx < timeline.length) speak();
        else synth.speak(new SpeechSynthesisUtterance("Done! Good job."));
    }
}

function warpBack() {
    if (currentIdx > 0) {
        currentIdx--;
        updateUI();
        speak();
    }
}

function repeatSpeech() { speak(); }

function resetWarp() {
    document.getElementById('warp-display').style.display = 'none';
    document.getElementById('selection-grid').style.display = 'grid';
    synth.cancel();
}

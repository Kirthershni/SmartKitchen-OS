// Keep your existing Mood logic exactly as it is
function changeMood(mood) {
    const statusDiv = document.getElementById('mood-status');
    const plannerSpan = document.querySelector('.logo span');
    
    const moodPalette = {
        'happy': { accent: '#eab308', sidebar: '#854d0e' },
        'sad':   { accent: '#3b82f6', sidebar: '#1e3a8a' },
        'lazy':  { accent: '#ec4899', sidebar: '#831843' }, // Pink
        'angry': { accent: '#ef4444', sidebar: '#7f1d1d' },
        'reset': { accent: '#a855f7', sidebar: '#4840a1' }  // Purple
    };

    const theme = moodPalette[mood] || moodPalette['reset'];

    if (statusDiv) {
        if (mood === 'reset') {
            statusDiv.innerText = ""; 
        } else {
            statusDiv.innerText = `System optimized for ${mood} mood`;
            statusDiv.style.color = theme.sidebar;
        }
    }

    if (plannerSpan) {
        plannerSpan.style.transition = "color 0.5s ease";
        plannerSpan.style.color = theme.accent;
    }
}

// Keep your existing Voice logic
function speak(text) {
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; 
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
}

const originalChangeMood = changeMood;
changeMood = function(mood) {
    originalChangeMood(mood);
    if(mood !== 'reset') {
        speak(`System optimized for ${mood} mood`);
    }
};

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;

    if (weight > 0 && height > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        const display = document.getElementById('result-display');
        const score = document.getElementById('bmi-score');
        const category = document.getElementById('bmi-category');
        const mealBox = document.getElementById('meal-recommendation');

        display.classList.remove('hidden');
        score.innerText = bmi;

        let plan = {};

        // Categories with high-stability images
        if (bmi < 18.5) {
            plan = {
                cat: "Underweight", col: "#eab308",
                b: { name: "Honey Oat Porridge", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&auto=format" },
                l: { name: "Creamy Salmon Pasta", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&auto=format" },
                d: { name: "Steak & Sweet Potato", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format" },
                // STABLE BEVERAGE: Orange Juice
                v: { name: "Fresh Orange Juice", img: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&auto=format" } 
            };
        } else if (bmi < 24.9) {
            plan = {
                cat: "Healthy Weight", col: "#2ecc71",
                b: { name: "Avocado Toast", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&auto=format" },
                l: { name: "Quinoa Buddha Bowl", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format" },
                d: { name: "Lemon Herb Chicken", img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&auto=format" },
                // STABLE BEVERAGE: Green Tea
                v: { name: "Hot Green Tea", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&auto=format" }
            };
        } else {
            plan = {
                cat: "Overweight", col: "#ef4444",
                b: { name: "Veggie Omelette", img: "https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=400" },
                l: { name: "Tuna Salad Wrap", img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400" },
                d: { name: "Grilled Cauliflower", img: "https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg?auto=compress&cs=tinysrgb&w=400" },
                v: { name: "Iced Green Tea", img: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400" }
		};
        }

        category.innerText = plan.cat;
        category.style.color = plan.col;

        mealBox.innerHTML = `
            <div class="meal-grid">
                <div class="dish-card">
                    <img src="${plan.b.img}" onerror="this.src='https://placehold.co/200x200?text=Breakfast'">
                    <div class="dish-info"><span>🌅 Breakfast</span><h4>${plan.b.name}</h4></div>
                </div>
                <div class="dish-card">
                    <img src="${plan.l.img}" onerror="this.src='https://placehold.co/200x200?text=Lunch'">
                    <div class="dish-info"><span>☀️ Lunch</span><h4>${plan.l.name}</h4></div>
                </div>
                <div class="dish-card">
                    <img src="${plan.d.img}" onerror="this.src='https://placehold.co/200x200?text=Dinner'">
                    <div class="dish-info"><span>🌙 Dinner</span><h4>${plan.d.name}</h4></div>
                </div>
                <div class="dish-card highlight">
                    <img src="${plan.v.img}" onerror="this.src='https://placehold.co/200x200?text=Beverage'">
                    <div class="dish-info"><span>🥤 Beverage</span><h4>${plan.v.name}</h4></div>
                </div>
            </div>
        `;

        if (typeof speak === "function") {
            speak(`Your BMI is ${bmi}. Check your ${plan.cat} meal plan.`);
        }
    }
}

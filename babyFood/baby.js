/**
 * BABYBITES LAB - COMPONENT LOGIC
 * Features: Local Database (20 Meals), Search, Filtering, and Nutritional Report
 */

const babyMealsDB = [
    // --- 6+ MONTHS: BREAKFAST ---
    { 
        id: 'b1', name: 'Creamy Apple Oats', cat: 'Breakfast', age: '6m+', cal: 120, p: '3g', c: '18g', f: '4g', 
        img: 'https://images.unsplash.com/photo-1504113891439-b56535695844?q=80&w=500', 
        ingredients: ['1/4 cup Rolled oats', '2 tbsp Apple puree', '1/2 cup Breastmilk/Formula'],
        benefits: 'Rich in fiber for digestion and iron for brain development.',
        instructions: 'Cook oats in water until very soft. Stir in apple puree and thin with milk to a smooth, runny consistency.' 
    },
    { 
        id: 'b2', name: 'Banana Avocado Mash', cat: 'Breakfast', age: '6m+', cal: 155, p: '2g', c: '20g', f: '9g', 
        img: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?q=80&w=500', 
        ingredients: ['1/2 Ripe banana', '1/4 Avocado', 'Pinch of cinnamon'],
        benefits: 'High in healthy fats (DHA) essential for nervous system growth.',
        instructions: 'Mash banana and avocado together until no lumps remain. Sprinkle with a tiny pinch of cinnamon.' 
    },

    // --- 6+ MONTHS: SIDES & PUREES ---
    { 
        id: 'b3', name: 'Sweet Potato & Carrot', cat: 'Sides & Purees', age: '6m+', cal: 95, p: '1.5g', c: '16g', f: '0.2g', 
        img: 'https://images.unsplash.com/photo-1595033538458-941168128362?q=80&w=500', 
        ingredients: ['1/2 Sweet potato', '1 Large carrot'],
        benefits: 'Packed with Beta-carotene for healthy eye development and immunity.',
        instructions: 'Steam both until fork-tender. Blend with a little steaming water until silky smooth.' 
    },
    { 
        id: 'b4', name: 'Silky Pea Puree', cat: 'Sides & Purees', age: '6m+', cal: 75, p: '5g', c: '12g', f: '0.3g', 
        img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=500', 
        ingredients: ['1 cup Green peas', '1 Fresh mint leaf', 'Water'],
        benefits: 'Great source of plant-based protein and Vitamin K for bone health.',
        instructions: 'Boil peas with mint. Drain and blend, straining through a fine sieve to remove all skins.' 
    },
    { 
        id: 'b5', name: 'Golden Pear & Pumpkin', cat: 'Sides & Purees', age: '6m+', cal: 80, p: '1g', c: '15g', f: '0.1g', 
        img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=500', 
        ingredients: ['1/2 Pear', '1/4 cup Pumpkin chunks'],
        benefits: 'Gentle on the stomach; helps naturally relieve baby constipation.',
        instructions: 'Steam pear and pumpkin until soft. Mash thoroughly with a fork or pulse in a blender.' 
    },
    { 
        id: 'b6', name: 'Spinach & White Bean', cat: 'Sides & Purees', age: '6m+', cal: 105, p: '6g', c: '14g', f: '0.5g', 
        img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e2?q=80&w=500', 
        ingredients: ['Handful of Baby spinach', '1/4 cup White beans (Cannellini)'],
        benefits: 'High in Iron and Calcium for healthy blood and bone growth.',
        instructions: 'Wilt spinach in a pan and mash beans. Blend together with a dash of olive oil.' 
    },

    // --- 6+ MONTHS: SOFT TREATS ---
    { 
        id: 'b7', name: 'Mango Yogurt Swirl', cat: 'Soft Treats', age: '6m+', cal: 115, p: '5g', c: '18g', f: '2g', 
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=500', 
        ingredients: ['1/4 cup Mango puree', '2 tbsp Greek yogurt'],
        benefits: 'Probiotics for gut health and Vitamin C to support a tiny immune system.',
        instructions: 'Swirl fresh mango puree into plain, unsweetened Greek yogurt.' 
    },
    { 
        id: 'b8', name: 'Blueberry Chia Mush', cat: 'Soft Treats', age: '6m+', cal: 130, p: '2g', c: '14g', f: '5g', 
        img: 'https://images.unsplash.com/photo-1464305795204-6f5bdf7f8241?q=80&w=500', 
        ingredients: ['10 Blueberries', '1 tsp Chia seeds', '2 tbsp Water'],
        benefits: 'Antioxidants for cellular health and Omega-3s for brain power.',
        instructions: 'Soak chia seeds in water for 20 mins until gelatinous. Mix with crushed blueberries.' 
    },

    // --- 1+ YEAR: BREAKFAST ---
    { 
        id: 'b9', name: 'Mini Banana Pancakes', cat: 'Breakfast', age: '1yr+', cal: 190, p: '6g', c: '28g', f: '6g', 
        img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=500', 
        ingredients: ['1 Banana', '1 Egg', '2 tbsp Oat flour'],
        benefits: 'Energy-dense meal to fuel active toddler exploration and play.',
        instructions: 'Whisk all ingredients. Cook small, silver-dollar sized pancakes on a non-stick pan until golden.' 
    },
    { 
        id: 'b10', name: 'Veggie Egg Muffins', cat: 'Breakfast', age: '1yr+', cal: 145, p: '9g', c: '5g', f: '10g', 
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500', 
        ingredients: ['1 Egg', '2 tbsp Chopped broccoli', '1 tbsp Mild cheese'],
        benefits: 'High protein and healthy fats to support rapid toddler muscle growth.',
        instructions: 'Whisk egg and veg. Pour into muffin tins and bake at 180°C for 15 mins.' 
    },
    { 
        id: 'b11', name: 'Fruity Quinoa Bowl', cat: 'Breakfast', age: '1yr+', cal: 220, p: '8g', c: '32g', f: '5g', 
        img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500', 
        ingredients: ['1/2 cup Cooked Quinoa', '3 Strawberries', 'Splash of whole milk'],
        benefits: 'A complete protein containing all essential amino acids for growth.',
        instructions: 'Warm cooked quinoa with milk. Top with finely diced fresh strawberries.' 
    },

    // --- 1+ YEAR: LUNCH/DINNER ---
    { 
        id: 'b12', name: 'Tiny Pastina Stars', cat: 'Lunch/Dinner', age: '1yr+', cal: 210, p: '7g', c: '36g', f: '4g', 
        img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=500', 
        ingredients: ['1/4 cup Star pasta', '1/2 cup Low-sodium broth', 'Grated Parmesan'],
        benefits: 'Easy-to-chew carbohydrates for sustained toddler energy.',
        instructions: 'Cook pasta directly in broth until liquid is absorbed. Stir in a little cheese.' 
    },
    { 
        id: 'b13', name: 'Soft Chicken Risotto', cat: 'Lunch/Dinner', age: '1yr+', cal: 260, p: '14g', c: '38g', f: '7g', 
        img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=500', 
        ingredients: ['Soft Rice', 'Finely shredded chicken', 'Smashed peas'],
        benefits: 'B-vitamins from chicken support metabolic health and energy.',
        instructions: 'Cook rice until very soft. Fold in finely shredded chicken and smashed cooked peas.' 
    },
    { 
        id: 'b14', name: 'Lentil Veggie Stew', cat: 'Lunch/Dinner', age: '1yr+', cal: 185, p: '11g', c: '30g', f: '1.5g', 
        img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500', 
        ingredients: ['Red lentils', 'Small zucchini diced', 'Vegetable broth'],
        benefits: 'Excellent source of folate and fiber for a healthy heart and gut.',
        instructions: 'Simmer lentils and zucchini in broth until lentils fall apart and zucchini is soft.' 
    },
    { 
        id: 'b15', name: 'Salmon Potato Bites', cat: 'Lunch/Dinner', age: '1yr+', cal: 235, p: '16g', c: '22g', f: '11g', 
        img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=500', 
        ingredients: ['Steamed Salmon flaked', '1 Mashed potato', 'Fresh Dill'],
        benefits: 'Omega-3 fatty acids essential for cognitive and visual development.',
        instructions: 'Mix flaked salmon with mashed potato and dill. Form into small, soft finger-friendly balls.' 
    },
    { 
        id: 'b16', name: 'Cheesy Broccoli Rice', cat: 'Lunch/Dinner', age: '1yr+', cal: 245, p: '10g', c: '34g', f: '8g', 
        img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=500', 
        ingredients: ['1/2 cup Soft rice', 'Chopped steamed broccoli', 'Mild Cheddar'],
        benefits: 'Calcium-rich meal to support the development of strong teeth and bones.',
        instructions: 'Steam broccoli until very soft. Mix into warm rice with a sprinkle of melted cheese.' 
    },
    { 
        id: 'b17', name: 'Mild Beef Stew', cat: 'Lunch/Dinner', age: '1yr+', cal: 255, p: '19g', c: '14g', f: '13g', 
        img: 'https://images.unsplash.com/photo-1534939561122-3d290a019d2b?q=80&w=500', 
        ingredients: ['Finely minced beef', 'Soft carrots', 'Mashed Potato'],
        benefits: 'High in bioavailable iron and zinc for a robust immune system.',
        instructions: 'Slow cook minced beef until extremely tender. Mash carrots and potatoes into the juice.' 
    },

    // --- 1+ YEAR: SOFT TREATS ---
    { 
        id: 'b18', name: 'Sweet Corn Pudding', cat: 'Soft Treats', age: '1yr+', cal: 165, p: '4g', c: '26g', f: '4.5g', 
        img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=500', 
        ingredients: ['Corn puree', 'Whole Milk', 'Pinch of cinnamon'],
        benefits: 'Lutein for eye health and natural energy from sweet corn.',
        instructions: 'Simmer corn puree with milk until thickened. Serve warm as a comforting treat.' 
    },
    { 
        id: 'b19', name: 'Baked Cinnamon Apples', cat: 'Soft Treats', age: '1yr+', cal: 110, p: '0.5g', c: '24g', f: '1.5g', 
        img: 'https://images.unsplash.com/photo-1568271675068-f76a588bb593?q=80&w=500', 
        ingredients: ['1 Apple diced', 'Cinnamon', 'Small pat of butter'],
        benefits: 'High in pectin fiber to support healthy gut bacteria.',
        instructions: 'Bake apple bits with cinnamon and butter until soft enough to smash with a plastic spoon.' 
    },
    { 
        id: 'b20', name: 'Cottage Cheese Fruit Cup', cat: 'Soft Treats', age: '1yr+', cal: 140, p: '13g', c: '11g', f: '3.5g', 
        img: 'https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=500', 
        ingredients: ['Lumpy Cottage cheese', 'Diced soft peaches'],
        benefits: 'High protein and calcium to support steady physical growth.',
        instructions: 'Mix diced soft peaches into low-sodium cottage cheese for a textured treat.' 
    }
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderBabyRecipes(babyMealsDB);
});

// --- SEARCH & FILTER LOGIC ---
function searchBabyMeals() {
    const query = document.getElementById('baby-search').value.toLowerCase();
    const filtered = babyMealsDB.filter(m => 
        m.name.toLowerCase().includes(query) || 
        m.cat.toLowerCase().includes(query) ||
        m.ingredients.some(i => i.toLowerCase().includes(query))
    );
    renderBabyRecipes(filtered);
}

function filterBaby(category) {
    // UI Update
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
    
    // Filtering
    const filtered = babyMealsDB.filter(m => m.cat === category);
    renderBabyRecipes(filtered);
}

// --- RENDERING ---
function renderBabyRecipes(meals) {
    const grid = document.getElementById('recipe-grid');
    if (!meals.length) {
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px; color:#64748b;">
            <h3>No gentle meals found.</h3>
            <p>Try searching for 'Apple', 'Oats', or 'Chicken'.</p>
        </div>`;
        return;
    }
    grid.innerHTML = meals.map(meal => `
        <div class="recipe-card" onclick="openBabyModal('${meal.id}')">
            <div class="cal-badge">${meal.cal} kcal</div>
            <img src="${meal.img}" alt="${meal.name}">
            <div class="card-info" style="padding:15px;">
                <span class="baby-tag">${meal.age}</span>
                <h3 style="margin:10px 0; font-size:1.1rem;">${meal.name}</h3>
                <div class="macros-strip" style="display:flex; justify-content:space-between; font-size:0.8rem; background:#f1f5f9; padding:5px 10px; border-radius:8px;">
                    <span>P: <b>${meal.p}</b></span>
                    <span>C: <b>${meal.c}</b></span>
                    <span>F: <b>${meal.f}</b></span>
                </div>
            </div>
        </div>
    `).join('');
}

// --- MODAL / REPORT DISPLAY ---
function openBabyModal(id) {
    const meal = babyMealsDB.find(m => m.id === id);
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="analysis-report" style="animation: fadeIn 0.4s ease;">
            <button class="back-btn" onclick="closeModal()" style="margin-bottom:20px; cursor:pointer;">← Back to Hub</button>
            
            <div class="report-header" style="display:flex; gap:25px; flex-wrap:wrap;">
                <img src="${meal.img}" class="report-img" style="width:100%; max-width:400px; height:250px; object-fit:cover; border-radius:20px;">
                
                <div class="nutrition-label" style="flex:1; min-width:250px; border:2px solid #000; padding:15px; background:#fff;">
                    <div style="font-size:1.6rem; font-weight:900; border-bottom:8px solid #000; margin-bottom:5px;">Nutrition Facts</div>
                    <div style="border-bottom:1px solid #000; padding:5px 0; display:flex; justify-content:space-between; font-weight:bold;">
                        <span>Calories</span> <span>${meal.cal}</span>
                    </div>
                    <div style="border-bottom:1px solid #000; padding:5px 0; display:flex; justify-content:space-between;">
                        <span>Total Fat</span> <span>${meal.f}</span>
                    </div>
                    <div style="border-bottom:1px solid #000; padding:5px 0; display:flex; justify-content:space-between;">
                        <span>Total Carbohydrate</span> <span>${meal.c}</span>
                    </div>
                    <div style="border-bottom:4px solid #000; padding:5px 0; display:flex; justify-content:space-between; font-weight:bold;">
                        <span>Protein</span> <span>${meal.p}</span>
                    </div>
                    <p style="font-size:0.7rem; margin-top:5px;">*Molecular analysis for infant growth.</p>
                </div>
            </div>

            <div class="report-body" style="margin-top:30px;">
                <div class="benefits-box" style="background:#f0fdf4; border-left:5px solid #22c55e; padding:15px; border-radius:8px; color:#166534; margin-bottom:20px;">
                    <strong>💡 Why this is good for baby:</strong>
                    <p style="margin-top:5px;">${meal.benefits}</p>
                </div>

                <h3 style="color:#1e293b; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">Molecular Components</h3>
                <ul class="ingredient-list" style="list-style:none; padding:0; margin:15px 0;">
                    ${meal.ingredients.map(ing => `<li style="padding:8px 0; border-bottom:1px solid #f1f5f9;">• ${ing}</li>`).join('')}
                </ul>

                <h3 style="color:#1e293b; border-bottom:1px solid #e2e8f0; padding-bottom:10px; margin-top:20px;">Preparation Steps</h3>
                <div class="instruction-box" style="background:#f8fafc; padding:20px; border-radius:12px; margin:15px 0; line-height:1.6;">
                    <p>${meal.instructions}</p>
                </div>

                <div class="mom-tip" style="background:#fff1f2; padding:15px; border-radius:10px; font-style:italic; color:#be123c; text-align:center; border:1px dashed #fb7185;">
                    <strong>👩‍🍳 Mom's Pro-Tip:</strong> Always test the food temperature on your wrist before feeding!
                </div>
            </div>
        </div>
    `;
    document.getElementById('recipe-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', loadMyRecipes);

function saveRecipe() {
    const title = document.getElementById('recipe-title').value;
    const image = document.getElementById('recipe-image').value || 'https://via.placeholder.com/300?text=No+Image';
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;

    if (!title || !ingredients || !instructions) {
        return alert("Please fill in the title, ingredients, and instructions!");
    }

    const newRecipe = {
        id: 'local_' + Date.now(), // Unique ID for LocalStorage
        strMeal: title,
        strMealThumb: image,
        strIngredients: ingredients,
        strInstructions: instructions,
        isLocal: true // Tag to identify user-created content
    };

    // Get existing recipes, add new one, save back
    let recipes = JSON.parse(localStorage.getItem('myGourmetCollection')) || [];
    recipes.push(newRecipe);
    localStorage.setItem('myGourmetCollection', JSON.stringify(recipes));

    // Clear form and refresh
    document.querySelectorAll('.form-grid input, .form-grid textarea').forEach(el => el.value = '');
    loadMyRecipes();
}

function loadMyRecipes() {
    const grid = document.getElementById('my-recipes-grid');
    const recipes = JSON.parse(localStorage.getItem('myGourmetCollection')) || [];
    grid.innerHTML = "";

    if (recipes.length === 0) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #94a3b8;'>Your cookbook is empty. Add your first recipe above!</p>";
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.style.position = 'relative';
        card.innerHTML = `
            <div onclick="openLocalModal('${recipe.id}')">
                <img src="${recipe.strMealThumb}" style="width:100%; height:200px; object-fit:cover;">
                <div class="card-info" style="padding: 20px;">
                    <h3>${recipe.strMeal}</h3>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteRecipe('${recipe.id}')">🗑️ Delete</button>
        `;
        grid.appendChild(card);
    });
}

function deleteRecipe(id) {
    if (!confirm("Are you sure you want to delete this secret recipe?")) return;
    let recipes = JSON.parse(localStorage.getItem('myGourmetCollection')) || [];
    recipes = recipes.filter(r => r.id !== id);
    localStorage.setItem('myGourmetCollection', JSON.stringify(recipes));
    loadMyRecipes();
}

// Special Modal opener for local data (not using API)
function openLocalModal(id) {
    const recipes = JSON.parse(localStorage.getItem('myGourmetCollection')) || [];
    const meal = recipes.find(r => r.id === id);
    
    const modalBody = document.getElementById('modal-body');
    
    // Split the ingredients by lines for the display
    const ingList = meal.strIngredients.split('\n').map(i => `<li>${i}</li>`).join('');

    modalBody.innerHTML = `
        <h2 style="font-family:'Playfair Display'; font-size:2.5rem; margin-bottom:15px;">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" class="modal-header-img">
        <div class="recipe-section">
            <h3 style="color:var(--accent);">Ingredients</h3>
            <ul style="columns: 2;">${ingList}</ul>
        </div>
        <div class="recipe-section">
            <h3 style="color:var(--accent);">Instructions</h3>
            <p style="white-space:pre-line; line-height:1.6;">${meal.strInstructions}</p>
        </div>
    `;
    document.getElementById('recipe-modal').style.display = 'block';
}

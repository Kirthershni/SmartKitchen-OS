function injectSidebar() {
    // Logic to detect if we are in a subfolder
    const path = window.location.pathname;
    const isSub = path.includes('/DnaLab/') || 
                  path.includes('/budgetPlanner/') || 
                  path.includes('/moodStudio/') || 
                  path.includes('/mutationArchive/') || 
                  path.includes('/myRecipes/') || 
                  path.includes('/timeWrap/'); // Matches your folder name
    
    const prefix = isSub ? '../' : './';

    const html = `
        <div class="sidebar-header">
            <button id="menu-toggle" onclick="toggleSidebar()" 
                    style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); 
                    color:white; width:45px; height:45px; border-radius:12px; cursor:pointer; 
                    margin-bottom:30px; font-size:1.4rem;">☰</button>
        </div>
        <nav class="side-nav">
            <ul style="list-style:none;">
                <li onclick="location.href='${prefix}index.html'" class="nav-item">🏠 <span>Home</span></li>
                <li onclick="location.href='${prefix}DnaLab/lab.html'" class="nav-item">🧬 <span>DNA Lab</span></li>
                <li onclick="location.href='${prefix}moodStudio/studio.html'" class="nav-item">🎭 <span>Mood Studio</span></li>
                <li onclick="location.href='${prefix}budgetPlanner/budget.html'" class="nav-item">💰 <span>Budget Planner</span></li>
                <li onclick="location.href='${prefix}myRecipes/recipes.html'" class="nav-item">👨‍🍳 <span>My Kitchen</span></li>
                <li onclick="location.href='${prefix}mutationArchive/mutation.html'" class="nav-item">👽 <span>Mutation Archive</span></li>
                <li onclick="location.href='${prefix}timeWrap/time.html'" class="nav-item">⏰ <span>Time Warp</span></li>
            </ul>
        </nav>

        <div class="mood-selector">
            <h4>Cooking Mood?</h4>
            <div class="mood-buttons">
                <button onclick="changeMood('happy')" title="Happy">😊</button>
                <button onclick="changeMood('sad')" title="Sad">😢</button>
                <button onclick="changeMood('lazy')" title="Lazy">🥱</button>
                <button onclick="changeMood('angry')" title="Angry">🔥</button>
                <button onclick="changeMood('reset')" title="Reset">🔄</button>
            </div>
        </div>
    `;
    
    const container = document.getElementById('sidebar-container');
    if (container) container.innerHTML = html;
}

function toggleSidebar() {
    document.getElementById('sidebar-container').classList.toggle('collapsed');
}

document.addEventListener('DOMContentLoaded', injectSidebar);

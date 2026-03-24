function injectSidebar() {
    const path = window.location.pathname;
    
    // Check if we are currently inside any subfolder
    const subfolders = [
        'DnaLab', 'budgetPlanner', 'moodStudio', 'mutationArchive', 
        'myRecipes', 'timeWrap', 'firelessFlow', 'beveragesBar', 'bmi', 'babyFood'
    ];
    
    // Improved check: handles GitHub repo names and local testing
    const isSub = subfolders.some(folder => path.includes('/' + folder + '/'));
    
    // prefix is '../' if inside a folder, empty if at the root
    const prefix = isSub ? '../' : '';

    const html = `
        <div class="sidebar-header">
            <button id="menu-toggle" onclick="toggleSidebar()" 
                    style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); 
                    color:white; width:45px; height:45px; border-radius:12px; cursor:pointer; 
                    margin-bottom:30px; font-size:1.4rem;">☰</button>
        </div>
        <nav class="side-nav">
            <ul style="list-style:none; padding:0;">
                <li onclick="location.href='${prefix}index.html'" class="nav-item">🏠 <span>Home</span></li>
                <li onclick="location.href='${prefix}DnaLab/lab.html'" class="nav-item">🧬 <span>DNA Lab</span></li>
                <li onclick="location.href='${prefix}moodStudio/studio.html'" class="nav-item">🎭 <span>Mood Studio</span></li>
                <li onclick="location.href='${prefix}budgetPlanner/budget.html'" class="nav-item">💰 <span>Budget Planner</span></li>
                <li onclick="location.href='${prefix}mutationArchive/mutation.html'" class="nav-item">👽 <span>Mutation Archive</span></li>
                <li onclick="location.href='${prefix}timeWrap/time.html'" class="nav-item">⏰ <span>Time Warp</span></li>
                <li onclick="location.href='${prefix}firelessFlow/fireless.html'" class="nav-item">🧯 <span>Fireless Flow</span></li>
                <li onclick="location.href='${prefix}beveragesBar/beverages.html'" class="nav-item">🍷 <span>Beverages Bar</span></li>
                <li onclick="location.href='${prefix}bmi/index.html'" class="nav-item">🏃‍♂️ <span>Fitness Planner</span></li>
                
                <li onclick="location.href='${prefix}babyFood/index.html'" class="nav-item">👶 <span>Baby Food Lab</span></li>
            </ul>
        </nav>

        <div class="mood-selector" style="margin-top:30px; text-align:center;">
            <h4 style="color:white; font-size:0.8rem; margin-bottom:10px;">Cooking Mood?</h4>
            <div class="mood-buttons" style="display:flex; gap:5px; justify-content:center;">
                <button onclick="changeMood('happy')" title="Happy">😊</button>
                <button onclick="changeMood('sad')" title="Sad">😢</button>
                <button onclick="changeMood('lazy')" title="Lazy">🥱</button>
                <button onclick="changeMood('angry')" title="Angry">🔥</button>
                <button onclick="changeMood('reset')" title="Reset">🔄</button>
            </div>
        </div>
    `;
    
    const container = document.getElementById('sidebar-container');
    if (container) {
        container.innerHTML = html;
    }
}

function toggleSidebar() {
    const container = document.getElementById('sidebar-container');
    if (container) container.classList.toggle('collapsed');
}

// Ensure the sidebar builds when the page is ready
document.addEventListener('DOMContentLoaded', injectSidebar);


// 1. Отримання користувачів
async function getUsers(sort = 'name', order = 'asc') {
    try {
        const response = await fetch(`/api/users?sort=${sort}&order=${order}`);
        const users = await response.json();
        
        const container = document.getElementById('users-container');
        container.innerHTML = users.map(user => `
            <div class="user-card">
                <strong>${user.name} ${user.surname}</strong><br>
                Email: ${user.email}
            </div>
        `).join('');
    } catch (e) {
        console.error("Помилка користувачів:", e);
    }
}

// 2. Галерея
async function loadGallery() {
    try {
        const response = await fetch('/api/gallery');
        const images = await response.json();
        
        const galleryDiv = document.getElementById('gallery');
        galleryDiv.innerHTML = images.map(img => 
            `<img src="/gallery/${img}" alt="img">`
        ).join('');
    } catch (e) {
        console.error("Помилка галереї:", e);
    }
}

// 3. Погода (оновлюється раз на хвилину)
async function updateWeather() {
    try {
        const response = await fetch('/weather');
        const data = await response.json();
        document.getElementById('weather-widget').innerHTML = `
            <h3>${data.city}</h3>
            <p>Температура: <b>${data.temperature}°C</b></p>
        `;
    } catch (e) {
        console.error("Помилка погоди:", e);
    }
}

// Перемикання вкладок (Користувачі / Галерея)
window.showSection = function(sectionId) {
    document.getElementById('users-section').style.display = sectionId === 'users' ? 'block' : 'none';
    document.getElementById('gallery-section').style.display = sectionId === 'gallery' ? 'block' : 'none';
}

// Запуск при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    getUsers();
    loadGallery();
    updateWeather();
    setInterval(updateWeather, 60000);
});
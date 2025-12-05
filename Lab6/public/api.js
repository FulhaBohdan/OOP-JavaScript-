// 1. Функція отримання юзерів
async function fetchUsers(sort = 'name', order = 'asc') {
    const response = await fetch(`/api/users?sort=${sort}&order=${order}`);
    const users = await response.json();
    
    // Тут встав свій код відображення таблиці з 4-ї лаби. 
    // Для прикладу я виведу в консоль:
    console.log("Отримано юзерів:", users);
    
    // Приклад простого виводу (якщо в тебе є <div id="users">)
    const container = document.getElementById('users');
    if (container) {
        container.innerHTML = users.map(u => `<p>${u.name} ${u.surname}</p>`).join('');
    }
}

// 2. Функція галереї
async function loadGallery() {
    const response = await fetch('/api/gallery');
    const images = await response.json();
    const container = document.getElementById('gallery'); // Перевір, чи є такий ID в HTML
    
    if (container) {
        container.innerHTML = images.map(img => 
            `<img src="/gallery/${img}" width="150" style="margin:5px">`
        ).join('');
    }
}

// 3. Функція погоди
async function updateWeather() {
    const response = await fetch('/weather');
    const data = await response.json();
    const el = document.getElementById('weather-widget'); // Перевір ID в HTML
    
    if (el) {
        el.innerHTML = `Київ: ${data.temperature}°C`;
    }
}

// Запуск при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    loadGallery();
    updateWeather();
    setInterval(updateWeather, 60000); // Оновлення погоди щохвилини
});
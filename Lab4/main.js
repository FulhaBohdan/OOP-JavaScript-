
let currentUsers = [];
let editMode = false;

function init() {
    const main = document.getElementById('main');

    const header = document.createElement('header');
    const buttons = ['User Rating', 'News', 'Contacts', 'About'];

    buttons.forEach(text => {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.addEventListener('click', () => {
            const t = document.querySelector('#content h2');
            if (t) t.textContent = text;
        });
        header.appendChild(btn);
    });

    main.appendChild(header);

    const mainEl = document.createElement('main');

    const leftPanel = document.createElement('div');
    leftPanel.id = 'leftPanel';
    leftPanel.innerHTML = `<div class="loader"></div>`;
    mainEl.appendChild(leftPanel);

    const content = document.createElement('div');
    content.id = 'content';
    content.innerHTML = `<div class="loader"></div>`;
    mainEl.appendChild(content);

    const rightPanel = document.createElement('div');
    rightPanel.id = 'rightPanel';
    rightPanel.innerHTML = `<div class="loader"></div>`;
    mainEl.appendChild(rightPanel);

    main.appendChild(mainEl);

    const footer = document.createElement('footer');

    const usersBlock = document.createElement('div');
    usersBlock.className = "footer-block";
    usersBlock.innerHTML = `<h3>Current Users</h3><p id="currentUsersCount">0</p>`;
    footer.appendChild(usersBlock);

    const newUsersBlock = document.createElement('div');
    newUsersBlock.className = "footer-block";
    const newUsers = getNewUsers();
    newUsersBlock.innerHTML = `
        <h3>New Users</h3>
        <ul>${newUsers.map(u => `<li>${u.firstname} ${u.lastname}</li>`).join('')}</ul>
    `;
    footer.appendChild(newUsersBlock);

    main.appendChild(footer);

    setTimeout(() => {
        content.innerHTML = `
            <h2>User Rating</h2>
            <div class="no-users">
                <p>No users</p>
                <button id="getUsersBtn">Get Users</button>
            </div>
        `;
        document.getElementById('getUsersBtn').addEventListener('click', loadUsers);
    }, 1000);

    setTimeout(() => {
        leftPanel.innerHTML = `
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="Пошук користувачів...">
                <button id="searchBtn">Знайти</button>
            </div>
        `;
        document.getElementById('searchBtn').addEventListener('click', searchUsers);
    }, 1000);

    setTimeout(() => {
        rightPanel.innerHTML = `
            <div class="score-display">
                <h3>Загальна сума балів</h3>
                <p id="totalScore">0</p>
            </div>
            <div class="edit-checkbox">
                <label>
                    <input type="checkbox" id="editCheckbox">
                    <span>Edit table</span>
                </label>
            </div>
        `;

        document.getElementById('editCheckbox')
            .addEventListener('change', (e) => {
                editMode = e.target.checked;
                if (currentUsers.length) createTable(currentUsers);
            });
    }, 1000);
}

async function loadUsers() {
    const content = document.getElementById('content');
    content.innerHTML = `<h2>User Rating</h2><div class="loader"></div>`;

    currentUsers = await fetchUsers();

    document.getElementById('currentUsersCount').textContent = currentUsers.length;

    const total = currentUsers.reduce((s, u) => s + u.score, 0);
    const scoreEl = document.getElementById('totalScore');
    if (scoreEl) scoreEl.textContent = total;

    createTable(currentUsers);
}

function createTable(users) {
    const content = document.getElementById('content');
    const title = content.querySelector('h2').textContent;

    let html = `
        <h2>${title}</h2>
        <table id="usersTable">
            <thead>
                <tr>
                    <th id="sortByLastname">Прізвище</th>
                    <th>Ім'я</th>
                    <th>Бали</th>
                    ${editMode ? '<th>Дії</th>' : ''}
                </tr>
            </thead>
            <tbody>
    `;

    users.forEach((u, i) => {
        html += `
            <tr data-index="${i}">
                <td>${u.lastname}</td>
                <td>${u.firstname}</td>
                <td>${u.score}</td>
                ${editMode ? `<td><button class="delete-btn" onclick="deleteUser(${i})">Delete</button></td>` : ''}
            </tr>
        `;
    });

    html += `</tbody></table>`;
    content.innerHTML = html;

    document.getElementById('sortByLastname').addEventListener('click', sortTable);
}

function sortTable() {
    currentUsers.sort((a, b) => a.lastname.localeCompare(b.lastname, 'uk'));
    createTable(currentUsers);
}

function searchUsers() {
    const text = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#usersTable tbody tr');

    rows.forEach(row => {
        row.classList.toggle('highlight', text && row.textContent.toLowerCase().includes(text));
    });
}

window.deleteUser = function(index) {
    currentUsers.splice(index, 1);
    createTable(currentUsers);

    document.getElementById('currentUsersCount').textContent = currentUsers.length;

    const total = currentUsers.reduce((s, u) => s + u.score, 0);
    document.getElementById('totalScore').textContent = total;
};

window.addEventListener('DOMContentLoaded', init);
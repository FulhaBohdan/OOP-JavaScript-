const users = [
    { firstname: 'Михайло', lastname: 'Поплавський', score: 60 },
    { firstname: 'Володимир', lastname: 'Великий', score: 98 },
    { firstname: 'Олег', lastname: 'Ляшко', score: 45 },
    { firstname: 'Тарас', lastname: 'Шевченко', score: 95 },
    { firstname: 'Григорій', lastname: 'Сковорода', score: 89 },
    { firstname: 'Богдан', lastname: 'Хмельницький', score: 96 },
    { firstname: 'Леся', lastname: 'Українка', score: 73 },
    { firstname: 'Іван', lastname: 'Франко', score: 89 },
    { firstname: 'Остап', lastname: 'Вишня', score: 77 },
    { firstname: 'Олександр', lastname: 'Довженко', score: 67 },
    { firstname: 'Ігор', lastname: 'Сікорський', score: 90 },
    { firstname: 'Петро', lastname: 'Чорний', score: 67 },
    { firstname: 'Євген', lastname: 'Кошивий', score: 79 },
    { firstname: 'Георгій', lastname: 'Гонгадзе', score: 73 },
    { firstname: 'Володимир', lastname: 'Цибулько', score: 44 },
    { firstname: 'Віктор', lastname: 'Ющенко', score: 70 },
    { firstname: 'Михайло', lastname: 'Грушевський', score: 77 },
    { firstname: 'Леонід', lastname: 'Кучма', score: 66 },
    { firstname: 'Петро', lastname: 'Порошенко', score: 51 },
    { firstname: 'Юлія', lastname: 'Тимошенко', score: 56 }
];

function fetchUsers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const shuffled = [...users].sort(() => 0.5 - Math.random());
            resolve(shuffled.slice(0, 10));
        }, 1000);
    });
}

function getNewUsers() {
    return users.slice(0, 5);
}
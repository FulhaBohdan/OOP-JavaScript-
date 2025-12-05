// 1 Task
function invokeAfterDelay(func, delay) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(func()), delay);
    });
}

invokeAfterDelay(() => Math.floor(Math.random() * 11), 1000)
    .then(result => console.log(`Випадкове число: ${result}`));

// 2 Task 
function produceRandomAfterDelay() {
    return invokeAfterDelay(() => Math.floor(Math.random() * 11), 1000);
}

Promise.all([produceRandomAfterDelay(), produceRandomAfterDelay()])
    .then(results => console.log(`Сума: ${results[0]} + ${results[1]} = ${results[0] + results[1]}`));

// 3 Task
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 4 Task 
const users = [
    { id: 0, name: 'Михайло', age: 21, city: 'Київ' },
    { id: 1, name: 'Світлана', age: 25, city: 'Львів' },
    { id: 2, name: 'Олег', age: 31, city: 'Одеса' },
    { id: 3, name: 'Євген', age: 24, city: 'Чернігів' }
];

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(user => user.id === id);
            user ? resolve(user) : reject(new Error('User not found'));
        }, 1000);
    });
}

// 5 Task 
function loadUsers(ids) {
    const promises = ids.map(id => 
        getUser(id).catch(error => {
            console.error(`Помилка завантаження користувача ${id}: ${error.message}`);
            return null;
        })
    );
    return Promise.all(promises).then(users => users.filter(user => user !== null));
}

// 6 Task
function logCall(callback) {
    return new Promise(resolve => {
        setTimeout(() => {
            const result = callback();
            console.log(`Час виклику: ${new Date().toLocaleTimeString()}`);
            resolve(result);
        }, 1000);
    });
}

logCall(() => 'Перший виклик')
    .then(() => logCall(() => 'Другий виклик'))
    .then(() => logCall(() => 'Третій виклик'))
    .then(() => logCall(() => 'Четвертий виклик'));

// 7 Task 
async function showUsers(userIds) {
    console.log('loading');
    try {
        const users = await loadUsers(userIds);
        console.log('Завантажені користувачі:', users);
    } catch (error) {
        console.error('Помилка завантаження:', error);
    } finally {
        console.log('loading finished');
    }
}
// Перевірка 
showUsers([0, 1, 2]);
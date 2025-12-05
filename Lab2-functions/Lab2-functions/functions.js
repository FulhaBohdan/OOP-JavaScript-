// Task 1
function average(...args) {
    if (args.length === 0) return 0;
    const sum = args.reduce((acc, current) => acc + current, 0);
    return sum / args.length;
};

console.log(average(10, 20, 30));
console.log(average(5, 15));

// Task 2
function values(f, low, high) {
    const results = [];
    for (let i = low; i <= high; i++) {
        results.push(f(i));
    };
    return results;
};

const square = (x) => x * x;
console.log(values(square, 2, 5));

// Task 3
function callWithContext(obj, callback) {
    callback.call(obj);
};

const person = { name: 'Bohdan', age: 20 };

function birthdayGreeting() {
    const date = new Date().toLocaleDateString();
    console.log(`Today is ${date}! Happy birthday ${this.name}.`);
};

callWithContext(person, birthdayGreeting);

// Task 4
function createCounter() {
    let count = 0;
    return {
        increment: function() {
            count++;
        },
        getValue: function() {
            return count;
        }
    };
};

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue());

// Task 5
const getGreeting = (function() {
    let lastArg = null;
    let lastResult = null;

    return function(name) {
        if (name === lastArg) {
            console.log('(from cache)');
            return lastResult;
        };
        
        lastArg = name;
        lastResult = `Hello ${name}`;
        console.log('(calculated)');
        return lastResult;
    };
})();

console.log(getGreeting('Bohdan'));
console.log(getGreeting('Bohdan'));
console.log(getGreeting('Vlad'));

// Task 6
function sumCurry(a) {
    return function(b) {
        return a + b;
    };
};

const addTen = sumCurry(10);
console.log(addTen(5));
console.log(sumCurry(2)(3));

// Task 7
function createFilter(arr) {
    return function(text) {
        return arr.includes(text);
    };
};

const fruits = ['apple', 'banana', 'orange'];
const hasFruit = createFilter(fruits);

console.log(hasFruit('banana'));
console.log(hasFruit('cherry'));

// Task 8
const capitalizeProperty = (arr, prop) => {
    return arr.map(obj => ({
        ...obj,
        [prop]: obj[prop].charAt(0).toUpperCase() + obj[prop].slice(1)
    }));
};

const usersList = [{ name: 'oleg' }, { name: 'petro' }];
console.log(capitalizeProperty(usersList, 'name'));

// Task 9
function introduce(greeting) {
    console.log(`${greeting}, my name is ${this.name}`);
};

const student = { name: 'Ivan' };
const employee = { name: 'Maria' };

introduce.call(student, 'Hi'); // Call
introduce.apply(employee, ['Hello']); // Apply
const boundIntroduce = introduce.bind(student); // Bind
boundIntroduce('Greetings');

// Task 10
function logExecution(callback, ...args) {
    const time = new Date().toLocaleTimeString();
    console.log(`Function: ${callback.name}, Args: [${args}], Time: ${time}`);
    return callback(...args);
};

function multiply(a, b) {
    return a * b;
};

logExecution(multiply, 5, 6);

// Task 11
function cacheWithTimeout(fn, timeout) {
    let cache = null;
    let lastCallTime = 0;

    return function(...args) {
        const now = Date.now();
        if (cache !== null && (now - lastCallTime < timeout)) {
            console.log('Returning cached value');
            return cache;
        };

        const result = fn(...args);
        cache = result;
        lastCallTime = now;
        console.log('Calculating new value');
        return result;
    };
};

const getRandom = () => Math.floor(Math.random() * 100);
const getCachedRandom = cacheWithTimeout(getRandom, 5000); // 5 seconds cache

console.log(getCachedRandom());
console.log(getCachedRandom()); // Should use cache
setTimeout(() => { console.log(getCachedRandom()) }, 6000); // Should verify timeout
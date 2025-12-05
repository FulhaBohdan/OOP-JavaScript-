// Task 1
// Task 1.1
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

// Task 1.2
Book.prototype.getSummary = function() {
    return `Книга ${this.title} написана ${this.author} у ${this.year} році.`;
};

// Task 1.3
const book1 = new Book('Гаррі Поттер і філософський камінь', 'Дж. К. Роулінг', 1997);
const book2 = new Book('Захар Беркут', 'Іван Франко', 1883);

console.log(book1.getSummary());
console.log(book2.getSummary());
console.log(book1.__proto__ === Book.prototype);

// Task 1.4
Array.prototype.getLastElement = function() {
    return this[this.length - 1];
};

const numbers = [1, 99, 45, 7, 12];
console.log(numbers.getLastElement());
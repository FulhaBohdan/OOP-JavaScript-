// Task 2
class Publication {
    constructor(title, year) {
        this.title = title;
        this.year = year;
    }

    static type = 'General Publication';

    static isRecent(publicationYear) {
        return publicationYear > 2020;
    }
}

console.log(Publication.type);
console.log(Publication.isRecent(2022));

class Magazine extends Publication {
    #isDigital;

    constructor(title, year, issue) {
        super(title, year);
        this.issue = issue;
        this.#isDigital = false;
    }

    getYearInfo() {
        return `Рік видання: ${this.year}`;
    }

    get digitalStatus() {
        return this.#isDigital;
    }

    set setDigital(value) {
        this.#isDigital = value;
    }
}

const mag = new Magazine('Forbes Ukraine', 2023, 5);
console.log(mag.digitalStatus);
mag.setDigital = true;
console.log(mag.digitalStatus);

class Newspaper extends Magazine {
    getYearInfo() {
        const baseInfo = super.getYearInfo();
        return baseInfo + " (видається щоденно).";
    }
}

const dailyNews = new Newspaper('Голос України', 2024, 98);
console.log(dailyNews.getYearInfo());

// Task 3
const objA = new Publication('Наукова стаття', 2021);
const objB = new Magazine('National Geographic', 2023, 12);

console.log(objA instanceof Publication);
console.log(objB instanceof Magazine);
console.log(objB instanceof Publication);
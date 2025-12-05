console.log("\n--- ЧАСТИНА 7: Crypto Exchange ---");

// 1. Інтерфейси для Стану користувача
interface UserState {
    balanceUSD: number;
    cryptoAmount: number;
}

// 2. Типи повідомлень (Union Types)
// Використовуємо readonly, щоб не можна було підробити час або тип дії
type ActionType = "BUY" | "SELL";

interface TradeMessage {
    readonly action: ActionType;
    readonly amount: number; // Кількість крипти
    readonly timestamp: number;
}

interface PriceUpdate {
    readonly type: "PRICE_UPDATE";
    readonly newPrice: number;
}

// Об'єднання всіх можливих повідомлень
type WebSocketMessage = TradeMessage | PriceUpdate;

// 3. Поточний курс (імітація сервера)
let currentBtcRate: number = 40000; // Початковий курс

// Початковий стан клієнта
let clientState: UserState = {
    balanceUSD: 100000, // $100,000 на старті
    cryptoAmount: 0
};

// --- ФУНКЦІЇ ---

// Type Guard: перевіряє, чи є повідомлення торговою операцією
function isTradeMessage(msg: WebSocketMessage): msg is TradeMessage {
    return (msg as TradeMessage).action !== undefined;
}

// Функція обробки повідомлень (Server Logic Simulation)
function handleMessage(msg: WebSocketMessage, state: UserState): void {
    const date = new Date(msg.timestamp || Date.now()).toLocaleTimeString();
    
    // Перевірка через Type Guard
    if (isTradeMessage(msg)) {
        console.log(`[${date}] Отримано запит: ${msg.action} ${msg.amount} BTC`);
        processTrade(msg, state);
    } else {
        // Якщо це не торгівля, значить це оновлення ціни
        console.log(`[${date}] Оновлення курсу: $${msg.newPrice}`);
        currentBtcRate = msg.newPrice;
    }
}

// Логіка торгівлі (купівля/продаж)
function processTrade(trade: TradeMessage, state: UserState): void {
    const cost = trade.amount * currentBtcRate;

    if (trade.action === "BUY") {
        if (state.balanceUSD >= cost) {
            state.balanceUSD -= cost;
            state.cryptoAmount += trade.amount;
            console.log(`✅ Успішно куплено ${trade.amount} BTC. Витрачено $${cost}`);
        } else {
            console.error("❌ Помилка: Недостатньо коштів на балансі!");
        }
    } else if (trade.action === "SELL") {
        if (state.cryptoAmount >= trade.amount) {
            state.balanceUSD += cost;
            state.cryptoAmount -= trade.amount;
            console.log(`✅ Успішно продано ${trade.amount} BTC. Отримано $${cost}`);
        } else {
            console.error("❌ Помилка: Недостатньо крипти для продажу!");
        }
    }
    
    console.log(`   💰 Поточний баланс: $${state.balanceUSD}, BTC: ${state.cryptoAmount}`);
}


// --- ПЕРЕВІРКА РОБОТИ (SCENARIO) ---

console.log(`Старт системи. Курс BTC: $${currentBtcRate}`);
console.log(`Баланс клієнта: $${clientState.balanceUSD}`);
console.log("-".repeat(30));

// Сценарій 1: Клієнт купує 1 BTC
const buyMsg: TradeMessage = {
    action: "BUY",
    amount: 1,
    timestamp: Date.now()
};
handleMessage(buyMsg, clientState);

// Сценарій 2: Курс падає! (Прийшло повідомлення про зміну ціни)
const priceMsg: PriceUpdate = {
    type: "PRICE_UPDATE",
    newPrice: 35000
};
handleMessage(priceMsg, clientState);

// Сценарій 3: Клієнт купує ще 2 BTC за дешевшим курсом
handleMessage({ action: "BUY", amount: 2, timestamp: Date.now() }, clientState);

// Сценарій 4: Спроба продати 10 BTC (у нього стільки немає)
handleMessage({ action: "SELL", amount: 10, timestamp: Date.now() }, clientState);

// Сценарій 5: Продаж всього, що є (3 BTC)
handleMessage({ action: "SELL", amount: 3, timestamp: Date.now() }, clientState);
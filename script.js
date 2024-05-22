import { getBalance, contractBuyEnergy } from "./meta.js"
import { convertRubToEth, weiToEth } from "./usecase.js"

const button1 = document.getElementById('sellFormButton');
button1.onclick = showForm;

const button2 = document.getElementById('buyFormButton');
button2.onclick = showOfferList;

const button3 = document.getElementById('earnFormButton');
button3.onclick = showClickerForm;

const sellButton = document.getElementById('sellButton');
sellButton.onclick = sellEnergy;

const earnButton = document.getElementById('earnButton');
earnButton.onclick = increaseEnergy;

const message = document.getElementById('message');
const walletButton = document.getElementById('walletButton');

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length > 0) {
        walletButton.textContent = 'Проверить кошелек';
        walletButton.onclick = checkMetaMask;
    } else {
        walletButton.textContent = 'Подключить кошелек';
        walletButton.onclick = connectMetaMask;
    }
} else {
    message.textContent = 'MetaMask is not installed. Please install it to use this feature.';
    alert('MetaMask is not installed. Please install it to use this feature.');
}


async function connectMetaMask() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account:', accounts[0]);
        alert('MetaMask connected: ' + accounts[0]);

        const walletButton = document.getElementById('walletButton');
        walletButton.textContent = 'Проверить кошелек';
        walletButton.onclick = checkMetaMask;
    } catch (error) {
        console.error('Error connecting MetaMask', error);
        alert('Error connecting MetaMask');
    }
}

async function checkMetaMask() {
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            console.log('Connected account:', accounts[0]);
            alert('Connected account: ' + accounts[0]);
        } else {
            alert('No accounts connected');
        }
    } catch (error) {
        console.error('Error checking MetaMask', error);
        alert('Error checking MetaMask');
    }
}

// Функция для переключения форм
async function showForm() {
    document.getElementById('content').style.display = 'block';
    document.getElementById('offer-list').style.display = 'none';
    document.getElementById('clickerForm').style.display = 'none';
}

async function sellEnergy() {
    var amountInput = document.getElementById('amount');
    var priceInput = document.getElementById('price');
    var amountForSaleElement = document.getElementById('amountForSale');

    // Получаем значения из полей ввода
    var amount = parseFloat(amountInput.value);
    var price = parseFloat(priceInput.value);

    if (isNaN(amount) || isNaN(price) || amount <= 0 || price <= 0) {
        alert("Пожалуйста, введите корректные значения для продажи энергии.");
        return;
    }

    // Вычисляем общую сумму, полученную от продажи энергии
    var totalAmount = amount * price;

    // Получаем текущее количество энергии для продажи
    var currentAmountForSale = parseFloat(amountForSaleElement.textContent);

    if (currentAmountForSale >= amount) {
        // Уменьшаем количество энергии для продажи на проданное количество
        var newAmountForSale = currentAmountForSale - amount;
        amountForSaleElement.textContent = newAmountForSale.toFixed(2); // Округляем до двух знаков после запятой

        // Выводим информацию о продаже в консоль (для демонстрации)
        console.log("Продано " + amount + " кВтч по цене " + price + " за кВтч. Всего получено: " + totalAmount.toFixed(2) + " руб.");

        addSaleRow(amount, price)

        amountInput.value = '';
        priceInput.value = '';
    } else {
        alert("Недостаточно энергии для продажи.");
    }
}

async function showOfferList() {
    // Скрываем ненужные элементы и отображаем таблицу предложений
    document.getElementById('content').style.display = 'none';
    document.getElementById('clickerForm').style.display = 'none';
    document.getElementById('offer-list').style.display = 'block';
}

async function showClickerForm() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('offer-list').style.display = 'none';
    document.getElementById('clickerForm').style.display = 'block';

    // Получаем текущее количество энергии для продажи из формы 1
    var amountForSaleElement = document.getElementById('amountForSale');
    var currentAmountForSale = parseFloat(amountForSaleElement.textContent);

    // Устанавливаем значение кликера (#clickerAmount) равным текущему количеству энергии для продажи
    var clickerAmountElement = document.getElementById('clickerAmount');
    clickerAmountElement.textContent = currentAmountForSale.toFixed(2); // Округляем до двух знаков после запятой
}

async function increaseEnergy() {
    var clickerAmount = document.getElementById('clickerAmount');
    var currentAmount = parseFloat(clickerAmount.textContent);

    // Увеличиваем количество энергии на 10 каждый раз при клике
    var newAmount = currentAmount + 10;
    clickerAmount.textContent = newAmount.toFixed(2); // Округляем до двух знаков после запятой

    // Обновляем также значение энергии для продажи в основной форме (форма 1)
    var amountForSaleElement = document.getElementById('amountForSale');
    amountForSaleElement.textContent = newAmount.toFixed(2); // Округляем до двух знаков после запятой
}

async function addSaleRow(amount, price) {
    var offerTableBody = document.getElementById('offerTableBody');

    // Создаем новую строку (запись о продаже)
    var newRow = offerTableBody.insertRow();

    // Создаем ячейки для каждого столбца в новой строке
    var cell1 = newRow.insertCell();
    var cell2 = newRow.insertCell();
    var cell3 = newRow.insertCell();
    var cell4 = newRow.insertCell();

    // Устанавливаем содержимое ячеек в новой строке
    cell1.textContent = amount; // Количество энергии
    cell2.textContent = price; // Цена за кВтч

    // Создаем текстовое поле для ввода количества покупки~
    var quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 0;
    cell3.appendChild(quantityInput); // Добавляем поле в ячейку

    // Создаем кнопку "Купить" для покупки энергии
    var buyButton = document.createElement('button');
    buyButton.textContent = 'Купить';
    buyButton.onclick = async function () {
        // Добавьте здесь обработчик события для покупки энергии
        var quantityToBuy = parseFloat(quantityInput.value);
        if (isNaN(quantityToBuy) || quantityToBuy <= 0) {
            alert('Пожалуйста, введите корректное количество для покупки.');
            return;
        }
        // Обработка покупки
        if (amount >= quantityToBuy) {
            try {
                amount = await buyEnergy(amount, quantityToBuy, price);
                console.log("new amount", amount);

                cell1.textContent = parseFloat(amount);
            } catch (error) {
                console.error('Error buying energy2', error);
            }
        } else {
            alert('Недостаточно энергии для продажи.');
        }

    };
    cell4.appendChild(buyButton); // Добавляем кнопку в ячейку
}

async function buyEnergy(amountForSale, quantityToBuy, price) {
    try {
        // Получаем количество энергии и цену за кВтч из формы
        const energyAmount = quantityToBuy;
        const pricePerKwh = price;

        // Проверяем, что введены корректные значения
        if (isNaN(energyAmount) || isNaN(pricePerKwh) || energyAmount <= 0 || pricePerKwh <= 0) {
            alert('Пожалуйста, введите корректные значения для количества энергии и цены за кВтч.');
            return;
        }

        // Получаем аккаунты пользователя из MetaMask
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        // Проверяем, есть ли у пользователя аккаунты
        if (accounts.length === 0) {
            alert('Пожалуйста, подключите MetaMask и убедитесь, что у вас есть аккаунт.');
            return;
        }

        const balanceInEth = getBalance()
        console.log(balanceInEth)


        // Рассчитываем стоимость энергии
        const totalCost = energyAmount * pricePerKwh;

        const costInEth = await convertRubToEth(totalCost)
        console.log(costInEth)
        if (costInEth === null) {
            alert('Не удалось получить курс ETH/RUB.');
            return;
        }
        // Проверяем, достаточно ли у пользователя средств на счету
        if (balanceInEth < costInEth) {
            alert('У вас недостаточно средств на счету для покупки энергии.');
            return;
        }
        try {
            await contractBuyEnergy(costInEth)
            alert(`Вы успешно купили ${energyAmount} кВтч энергии за ${totalCost} РУБ(${costInEth} ETH).`);
        } catch (error) {
            console.error('Error buying energy', error);
            alert('Произошла ошибка при покупке энергии. Пожалуйста, попробуйте еще раз.');
            return
        }
        // Создаем контракт и отправляем его в Remix (вашу IDE для разработки контрактов)
        // Здесь нужно будет вставить код для создания контракта и отправки его в Remix

        return amountForSale - energyAmount
    } catch (error) {
        console.error('Error buying energy', error);
        alert('Произошла ошибка при покупке энергии. Пожалуйста, попробуйте еще раз.');

        return amountForSale
    }
}


addSaleRow(50, 5);
addSaleRow(100, 41);
addSaleRow(200, 3.5);


window.addEventListener('load', async () => {
    const message = document.getElementById('message');

    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
            walletButton.textContent = 'Проверить кошелек';
            walletButton.addEventListener('click', checkMetaMask);
        } else {
            walletButton.textContent = 'Подключить кошелек';
            walletButton.addEventListener('click', connectMetaMask);
        }
    } else {
        message.textContent = 'MetaMask is not installed. Please install it to use this feature.';
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
});

async function connectMetaMask() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account:', accounts[0]);
        alert('MetaMask connected: ' + accounts[0]);
    } catch (error) {
        console.error('Error connecting MetaMask', error);
        alert('Error connecting MetaMask');
    }
}

// Функция для переключения форм
function showForm() {
    document.getElementById('content').style.display = 'block';
    document.getElementById('offer-list').style.display = 'none';
    document.getElementById('clickerForm').style.display = 'none';
}

function sellEnergy() {
    event.preventDefault();

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

        // Очищаем поля ввода после продажи (это просто пример)
        amountInput.value = '';
        priceInput.value = '';
        return false;
    } else {
        alert("Недостаточно энергии для продажи.");
        return false;
    }
}

function showOfferList() {
    // Скрываем ненужные элементы и отображаем таблицу предложений
    document.getElementById('content').style.display = 'none';
    document.getElementById('clickerForm').style.display = 'none';
    document.getElementById('offer-list').style.display = 'block';
}

function showClickerForm() {
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

function increaseEnergy() {
    var clickerAmount = document.getElementById('clickerAmount');
    var currentAmount = parseFloat(clickerAmount.textContent);

    // Увеличиваем количество энергии на 10 каждый раз при клике
    var newAmount = currentAmount + 10;
    clickerAmount.textContent = newAmount.toFixed(2); // Округляем до двух знаков после запятой

    // Обновляем также значение энергии для продажи в основной форме (форма 1)
    var amountForSaleElement = document.getElementById('amountForSale');
    amountForSaleElement.textContent = newAmount.toFixed(2); // Округляем до двух знаков после запятой
}

function addSaleRow(amount, price) {
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
    buyButton.onclick = function () {
        // Добавьте здесь обработчик события для покупки энергии
        var quantityToBuy = parseFloat(quantityInput.value);
        if (isNaN(quantityToBuy) || quantityToBuy <= 0) {
            alert('Пожалуйста, введите корректное количество для покупки.');
            return;
        }
        // Обработка покупки
        if (amount >= quantityToBuy) {
            amount = buyEnergy(amount, quantityToBuy);
            cell1.textContent = parseFloat(amount)
        } else {
            alert('Недостаточно энергии для продажи.');
        }

    };
    cell4.appendChild(buyButton); // Добавляем кнопку в ячейку
}

function buyEnergy(amountForSale, quantityToBuy) {
    // Выполнить покупку, обновить таблицу или другие действия
    alert('Вы успешно купили ' + quantityToBuy + ' кВтч энергии.');
    return amountForSale - quantityToBuy

}

addSaleRow(50, 5);
addSaleRow(100, 41);
addSaleRow(200, 3.5);
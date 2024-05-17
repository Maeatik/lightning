export async function convertRubToEth(rubAmount) {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=rub');
        const data = await response.json();
        const ethToRubRate = data.ethereum.rub;
        const ethAmount = rubAmount / ethToRubRate;
        return ethAmount;
    } catch (error) {
        console.error('Ошибка при получении курса ETH/RUB:', error);
        return null;
    }
}

// Пример использования
const rubAmount = 10000; // Сумма в рублях
convertRubToEth(rubAmount)
    .then(ethAmount => {
        if (ethAmount !== null) {
            console.log(`${rubAmount} RUB составляет приблизительно ${ethAmount} ETH`);
        } else {
            console.log('Не удалось получить курс ETH/RUB.');
        }
    });


export function weiToEth(weiAmount) {
    // 1 ETH = 10^18 wei
    return weiAmount / 10 ** 18;
}    
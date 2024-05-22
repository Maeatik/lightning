import { ethers } from "ethers"

const test = document.getElementById('testButton');
test.onclick = paymentExample;

var address = "0x6B6c4a81a4Eb5B8A0e3Ecf0c5C628065444c4390"

var abi = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "returnValue",
                "type": "string"
            }
        ],
        "name": "PaymentEvent",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "doPayment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCreator",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getNumber",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getThis",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getThisBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_to",
                "type": "address"
            }
        ],
        "name": "paySeller",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "setMyNumber",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()
const signerAddress = await signer.getAddress()
console.log("Текущий счет:", signerAddress)

const signerBalance = await
    provider.getBalance(signerAddress)
console.log("Баланс текущего счета:", signerBalance, " wei")

export function getBalance() {
    return Number(signerBalance) / 10 ** 18;
}

// var getNumberPromise = contract.getNumber();

// getNumberPromise.then(function (num) {
//     console.log("Вызов бесплатной функции контракта getNumber():" + num);
// }).catch((error) => {
//     console.log(error);
// });

// var getContactPromise = contract.getCreator();
// getContactPromise.then(function (str) {
//     console.log("Вызов бесплатной функции контракта getNumber():" + str);
// }).catch((error) => {
//     console.log(error);
// });

async function paymentExample() {
    var contract = new ethers.Contract(address, abi, signer)

    var sum = 0.02 * 1e18;
    console.log("Сумма в wei: " + sum);
    sum = "0x" + sum.toString(16);
    console.log("Сумма в шестнадцатиричном виде: " + sum);
    // Вызовем платежную функцию контракта
    var getDoPaymentPromise = contract.doPayment(
        { value: sum });
    getDoPaymentPromise
        .then(function (n) {
            console.log(n);
        })
        .catch((error) => {
            console.log(error);
        });
}

export async function contractBuyEnergy(cost) {
    var contract = new ethers.Contract(address, abi, signer)
    console.log("Сумма за покупку энергии: " + sum)
    var sum = cost * 1e18;
    console.log("Сумма в wei: " + sum);
    sum = "0x" + sum.toString(16);
    console.log("Сумма в шестнадцатиричном виде: " + sum);
    // Вызовем платежную функцию контракта
    var getDoPaymentPromise = contract.doPayment(
        { value: sum });
    await getDoPaymentPromise
        .then(function (n) {
            console.log(n);
        })
        .catch((error) => {
            console.log(error);
            throw error
        });
}

// export async function contractSellEnergy(cost) {
//     var contract = new ethers.Contract(address, abi, signer)
//     console.log("Сумма за покупку энергии: " + sum)
//     var sum = cost * 1e18;
//     console.log("Сумма в wei: " + sum);
//     sum = "0x" + sum.toString(16);
//     console.log("Сумма в шестнадцатиричном виде: " + sum);
//     // Вызовем платежную функцию контракта
//     var getDoPaymentPromise = contract.paySeller(signerBalance,
//         { value: sum });
//     await getDoPaymentPromise
//         .then(function (n) {
//             console.log(n);
//         })
//         .catch((error) => {
//             console.log(error);
//             throw error
//         });
// }

export async function contractSellEnergy(cost) {
    var contract = new ethers.Contract(address, abi, signer)
    console.log("Сумма за покупку энергии: " + sum)
    var sum = cost * 1e18;
    console.log("Сумма в wei: " + sum);

    try {
        const tx = await contract.paySeller(signerAddress, { value: sum });
        console.log("Транзакция отправлена:", tx);
        const receipt = await tx.wait();
        console.log("Транзакция подтверждена:", receipt);
    } catch (error) {
        console.error("Ошибка при отправке транзакции:", error);
    }
}

// // Функция для продажи энергии
// export async function contractSellEnergy(sellerAddress, cost) {
//     var contract = new ethers.Contract(address, abi, signer);
//     var sum = ethers.utils.parseEther(cost.toString());
//     console.log("Сумма за продажу энергии в wei: " + sum.toString());

//     try {
//         const transaction = await contract.paySeller(sellerAddress, sum);
//         const receipt = await transaction.wait();
//         console.log("Транзакция успешна:", receipt);
//     } catch (error) {
//         console.error("Ошибка при продаже энергии:", error);
//         throw error;
//     }
// }
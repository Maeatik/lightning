import { ethers } from "ethers"

const test = document.getElementById('testButton');
test.onclick = paymentExample;

var address = "0xaac6fc064068da723f96d9efa0c94bb2ccf2c0fc"

var abi = [
    {
        "inputs": [],
        "name": "doPayment",
        "outputs": [],
        "stateMutability": "payable",
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
        "type": "fallback"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
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
        });
}
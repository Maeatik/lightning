import { ethers } from "ethers"

const test = document.getElementById('testButton');
test.onclick = paymentExample;

var address = "0xe8907f69eb7066dd6cf8888c09296f8110b1f733"

var abi = [
    {
        "constant": false,
        "inputs": [],
        "name": "doPayment",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
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

var contract = new ethers.Contract(address, abi, signer)

var getNumberPromise = contract.getNumber();

getNumberPromise.then(function (num) {
    console.log("Вызов бесплатной функции контракта getNumber():" + num);
}).catch((error) => {
    console.log(error);
});

async function paymentExample() {
    var sum = 0.0002 * 1e18;
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
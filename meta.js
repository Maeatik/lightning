import { ethers } from "ethers"

var address = "0xB661f9acBde155eFB41fE3Edb4fa6F4cd4856704"

var abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "billID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "reason",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cost",
                "type": "uint256"
            }
        ],
        "name": "BuyEnergyEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "billID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "reason",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cost",
                "type": "uint256"
            }
        ],
        "name": "PaymentEvent",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "bills",
        "outputs": [
            {
                "internalType": "string",
                "name": "reasonForOperation",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "cost",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "reason",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "doPayment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "billID",
                "type": "uint256"
            }
        ],
        "name": "getBill",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
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
        "name": "getContractAddress",
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
            },
            {
                "internalType": "string",
                "name": "reason",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "cost",
                "type": "uint256"
            }
        ],
        "name": "paySeller",
        "outputs": [],
        "stateMutability": "payable",
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

export async function contractBuyEnergy(cost, amount) {
    var contract = new ethers.Contract(address, abi, signer)
    console.log("Сумма за покупку энергии: " + sum)
    var sum = cost * 1e18;
    console.log("Сумма в wei: " + sum);
    sum = "0x" + sum.toString(16);
    console.log("Сумма в шестнадцатиричном виде: " + sum);
    // Вызовем платежную функцию контракта
    var getDoPaymentPromise = contract.doPayment("Покупка", amount,
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


export async function contractSellEnergy(cost, amount) {
    var contract = new ethers.Contract(address, abi, signer)
    console.log("Сумма за покупку энергии: " + sum)
    var sum = cost * 1e18;
    console.log("Сумма в wei: " + sum);
    sum = "0x" + sum.toString(16);
    console.log("Сумма в шестнадцатиричном виде: " + sum);
    try {
        const tx = await contract.paySeller(signerAddress, "Продажа", amount, sum);
        console.log("Транзакция отправлена:", tx);
        const receipt = await tx.wait();
        console.log("Транзакция подтверждена:", receipt);
    } catch (error) {
        console.error("Ошибка при отправке транзакции:", error);
    }
}

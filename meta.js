import { ethers } from "ethers"

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()
const signerAddress = await signer.getAddress()
console.log("Текущий счет:", signerAddress)

const signerBalance = await
    provider.getBalance(signerAddress)
console.log("Баланс текущего счета:", signerBalance, " wei")

export var Tmp = signerBalance

export function getBalance() {
    return signerBalance / 10 ** 18;
}
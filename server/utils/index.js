const { keccak256 } = require('ethereum-cryptography/keccak')
const { toHex } = require('ethereum-cryptography/utils')
const secp = require('ethereum-cryptography/secp256k1')
const { sha256 } = require('ethereum-cryptography/sha256')
const { utf8ToBytes } = require('ethereum-cryptography/utils')

const getAddress = (publicKey) => {
    return `0x${toHex(keccak256(publicKey.slice(1)).slice(-40))}`
}
const getAddressPK = (privateKey) => {
    const publicKey = secp.getPublicKey(privateKey)
    return getAddress(publicKey)
}
const getPair = () => {
    const privateKey = secp.utils.randomPrivateKey()
    const publicKey = secp.getPublicKey(privateKey)
    return { privateKey, publicKey }
}
const recoverAddress = (sign, hashMessage) => {
    // const msg = JSON.stringify(hashMessage)
    const hashMsg = keccak256(utf8ToBytes(hashMessage.toString()))
    const [sig, recoveryBit] = sign;
    const recoverHash = sig
    return getAddress(secp.recoverPublicKey(hashMsg, recoverHash, recoveryBit))
}

module.exports = { getAddress, getPair, getAddressPK, recoverAddress }
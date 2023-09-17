
const { toHex } = require('ethereum-cryptography/utils')
const {getAddress,getPair} = require('../utils')
// const privateKey = secp.utils.randomPrivateKey()
const {privateKey,publicKey} = getPair()
// const publicKey = secp.getPublicKey(privateKey)

const publicAddres = getAddress(publicKey)

console.log('private key', toHex(privateKey))
console.log('public key', toHex(publicKey))
console.log('publicAddres', "0x" + publicAddres)


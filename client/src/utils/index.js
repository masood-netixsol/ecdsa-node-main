
import * as secp from 'ethereum-cryptography/secp256k1'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes,toHex } from 'ethereum-cryptography/utils'
const useSignMessage = () => {

    // const getAddress = (publicKey) => {
    //     return toHex(keccak256(publicKey.slice(1)).slice(-40))
    // }
    // const getPair = () => {
    //     const privateKey = secp.utils.randomPrivateKey()
    //     const publicKey = secp.getPublicKey(privateKey)
    //     return { privateKey, publicKey }
    // }

    const getSignMessage = async (msg, privateKey) => {
        const msgHash = keccak256(utf8ToBytes(msg.toString()))
        const [sign, bit] = await secp.sign(msgHash, privateKey.trim(), { recovered: true })
        const hash = toHex(sign);
        return [hash, bit]
    }
    return { getSignMessage };
}

export default useSignMessage;
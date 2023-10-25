const secp = require("ethereum-cryptography/secp256k1.js")
const { toHex } = require("ethereum-cryptography/utils")

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log('private key: ', toHex(privateKey))

const publicKey = secp.secp256k1.getPublicKey(privateKey)

console.log('publick key: ', toHex(publicKey))
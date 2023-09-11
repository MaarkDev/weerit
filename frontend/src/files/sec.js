const CryptoJS = require('crypto-js');

function encryptData(KEY, SEED) {
    const encrypted = CryptoJS.AES.encrypt(KEY, SEED).toString();
    return encrypted;
}

export default encryptData;
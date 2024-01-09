const CryptoJS = require('crypto-js');

function decryptData(KEY, SEED) {
    const decrypted = CryptoJS.AES.decrypt(KEY, SEED).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

export default decryptData;
const CryptoJS = require('crypto-js');

function decryptData(encryptedKey, SEED) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, SEED);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    return null;
  }
}

const checkKey = (req, res) => {
  const headerkey = req.headers.authorization;
  const key = headerkey.slice(7);
  const secKey = decryptData(key, process.env.SEED);

  console.log('enKey: ' + key)
  console.log('plainkey: ' + secKey)

  if(secKey !== process.env.KEY) {
    return false;
  }else{
    return true
  }
}

module.exports = { decryptData, checkKey }
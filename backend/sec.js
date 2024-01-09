const CryptoJS = require('crypto-js');
const User = require('./models/userModel');
const { uuid } = require('uuidv4');

function decryptData(encryptedKey, SEED) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, SEED);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    return null;
  }
}

const checkKey = async (req, res) => {
  const userIdToCheck = req.headers.userid
  const getTokenToCompare = await User.findOne({ uid: userIdToCheck });
  const headerkey = req.headers.authorization;
  const token = headerkey.slice(7);

  if (token == getTokenToCompare.apiToken) {
    return true;
  } else {
    return false;
  }
}

const createNewToken = async (req, res, keyOk) => {
  const userId = req.headers.userid;
  const newToken = uuid().replace(/-/g, '');

  const encryptedToken = CryptoJS.AES.encrypt(newToken, process.env.SEED).toString();

  try {
    if (keyOk) {
      await User.findOneAndUpdate({ uid: userId }, {
        apiToken: newToken
      });
    }

  } catch (e) {
    console.log(e)
  }
}

module.exports = { decryptData, checkKey, createNewToken }
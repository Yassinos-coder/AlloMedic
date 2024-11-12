var CryptoJS = require("crypto-js");


const EncryptData = (data) => {
    let DataEncrypted = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_KEY).toString();
    return DataEncrypted
} 

module.exports = {EncryptData}
var CryptoJS = require("crypto-js");


const EncryptData = (data) => {
    let DataEncrypted = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_KEY).toString();
    return DataEncrypted
} 

const DecryptData = (data) => {
    var bytes = CryptoJS.AES.decrypt(data.encryptedData, '9adf1e4f7a12c5eb8bd83a87b1234567e1749b3a0f43d69aef15c9ed02e5a83f');
    var decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
        throw new Error('Decryption failed: Invalid or empty encrypted data');
    }

    var decryptedData = JSON.parse(decryptedString);

    console.log(decryptedData)
    return decryptedData; // Parse the decrypted JSON

}

module.exports = {EncryptData, DecryptData}
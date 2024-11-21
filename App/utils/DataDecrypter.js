import CryptoJS from 'crypto-js';

export const DecryptData = (data) => {
    var bytes = CryptoJS.AES.decrypt(data, process.env.DECRYPTION_KEY);
    var decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
        throw new Error('Decryption failed: Invalid or empty encrypted data');
    }

    var decryptedData = JSON.parse(decryptedString);

    return decryptedData; // Parse the decrypted JSON

}

export const EncryptData = (data) => {
    let DataEncrypted = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.DECRYPTION_KEY).toString();
    return DataEncrypted
} 

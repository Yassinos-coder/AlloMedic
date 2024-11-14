import CryptoJS from 'crypto-js';

export const DecryptData = (data) => {
    var bytes = CryptoJS.AES.decrypt(data, '9adf1e4f7a12c5eb8bd83a87b1234567e1749b3a0f43d69aef15c9ed02e5a83f');
    var decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
        throw new Error('Decryption failed: Invalid or empty encrypted data');
    }

    var decryptedData = JSON.parse(decryptedString);

    return decryptedData; // Parse the decrypted JSON

}

export const EncryptData = (data) => {
    let DataEncrypted = CryptoJS.AES.encrypt(JSON.stringify(data), '9adf1e4f7a12c5eb8bd83a87b1234567e1749b3a0f43d69aef15c9ed02e5a83f').toString();
    return DataEncrypted
} 

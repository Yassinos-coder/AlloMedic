import CryptoJS from 'crypto-js';

export const DecryptData = (data) => {
    try {
        // Attempt to decrypt the data
        var bytes = CryptoJS.AES.decrypt(data.encryptedResponse, process.env.EXPO_PUBLIC_DECRYPTION_KEY);
        var decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        // Check if the decrypted string is valid
        if (!decryptedString) {
            console.warn('Decryption failed: Data might not be encrypted.');
            return data; // Return the original data if decryption fails
        }

        // Parse the decrypted JSON
        var decryptedData = JSON.parse(decryptedString);
        return decryptedData;
    } catch (error) {
        console.warn('Decryption failed or data is not encrypted:', error.message);
        return data; // Return the original data if an error occurs
    }
};

export const EncryptData = (data) => {
    try {
        // Encrypt the data
        let DataEncrypted = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.EXPO_PUBLIC_DECRYPTION_KEY).toString();
        return DataEncrypted;
    } catch (error) {
        throw new Error(`Encryption failed: ${error.message}`);
    }
};

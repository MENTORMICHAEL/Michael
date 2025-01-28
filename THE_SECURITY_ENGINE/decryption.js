const crypto = require('crypto');

// Decryption function
const decryptData = (encryptedData, iv, secretKey) => {
    const key = crypto.createHash('sha256').update(secretKey).digest(); // Ensure key is 32 bytes
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'base64')); // AES-256-CBC
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8'); // Decrypt the data
    decrypted += decipher.final('utf8');
    return decrypted; // Return decrypted data
};

module.exports = decryptData;

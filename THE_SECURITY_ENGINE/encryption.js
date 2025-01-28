const crypto = require('crypto');

// Encryption function
const encryptData = (data, secretKey) => {
    const iv = crypto.randomBytes(16); // Random initialization vector
    const key = crypto.createHash('sha256').update(secretKey).digest(); // Ensure key is 32 bytes
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv); // AES-256-CBC
    let encrypted = cipher.update(data, 'utf8', 'base64'); // Encrypt the data
    encrypted += cipher.final('base64');
    return { iv: iv.toString('base64'), encryptedData: encrypted }; // Return encrypted data and IV
};

module.exports = encryptData;

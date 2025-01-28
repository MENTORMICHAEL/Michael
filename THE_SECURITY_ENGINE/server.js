const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const encryptData = require('./encryption');
const decryptData = require('./decryption');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// Secret key (in production, replace with a secure key)
const secretKey = 'your-256-bit-secret-key-here'; // Replace with an actual secure key

// Route to accept user data and encrypt it
app.post('/encrypt', (req, res) => {
    const { fName, lName, email, number, dob, country } = req.body;




//JUST ADDED
console.log(`Received Data: ${JSON.stringify(req.body)}`);










    if (!fName || !lName || !email || !number || !dob || !country) {
        return res.status(400).json({ error: 'All fields are required: fName, lName, email, number, dob, country' });
    }

    const data = `${fName}-${lName}-${email}-${number}-${dob}-${country}`; // Combine user data
    const encrypted = encryptData(data, secretKey); // Encrypt the data





//JUST ADDED

console.log(`Encrypted Data: ${encrypted.encryptedData}`); // Log the encrypted data
    console.log(`IV: ${encrypted.iv}`);





    res.json({ encryptedData: encrypted.encryptedData, iv: encrypted.iv });
});

// Route to decrypt data
app.post('/decrypt', (req, res) => {
    const { encryptedData, iv } = req.body;





//JUST ADDED
console.log(`Decrypt Request: Encrypted Data = ${encryptedData}, IV = ${iv}`);









    if (!encryptedData || !iv) {
        return res.status(400).json({ error: 'Both encryptedData and iv are required' });
    }

    try {
        const decryptedData = decryptData(encryptedData, iv, secretKey); // Decrypt the data







//ADDED

 console.log("Decrypted Data:", decryptedData);










//JUST ADDED

console.log(`Decrypted Data: ${decryptedData}`);










        res.json({ decryptedData });
    } catch (err) {
        




//JUST ADDED

console.error('Decryption Error:', err.message);







res.status(400).json({ error: 'Invalid encrypted data or IV' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

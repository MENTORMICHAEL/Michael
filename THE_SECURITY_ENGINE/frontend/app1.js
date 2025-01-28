const validateForm = document.getElementById('validateForm');

validateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const encryptedData = document.getElementById('encryptedDataInput').value;
    const iv = document.getElementById('ivInput').value;





//JUST ADDED
console.log("Encrypted Data Sent to Backend:", encryptedData);
    console.log("IV Sent to Backend:", iv);












    if (!encryptedData || !iv) {
        alert('Please provide both the Encrypted Data and IV.');
        return;
    }

    try {
        const response = await fetch('/decrypt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ encryptedData, iv })
        });

        const result = await response.json();









//JUST ADDED

console.log("Decryption Response from Backend:", result);












        if (response.ok) {
            const decryptedData = result.decryptedData;






//JUST ADDDED

console.log("Decrypted Data:", decryptedData);












            const fields = decryptedData.split('-');

            if (fields.length === 6) {
                const [fName, lName, email, number, dob, country] = fields;

                document.getElementById('virtualIDCard').innerHTML = `
                    <h3>Virtual ID Card</h3>
                    <p><strong>First Name:</strong> ${fName}</p>
                    <p><strong>Last Name:</strong> ${lName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone Number:</strong> ${number}</p>
                    <p><strong>Date of Birth:</strong> ${dob}</p>
                    <p><strong>Country:</strong> ${country}</p>
                `;
            } else {
                alert('Decrypted data format is invalid.');
            }
        } else {
            alert(result.error || 'Decryption failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});

// Navbar Toggle
function myFunction() {
    const x = document.getElementById('mynav');
    x.style.display = x.style.display === 'block' ? 'none' : 'block';
}
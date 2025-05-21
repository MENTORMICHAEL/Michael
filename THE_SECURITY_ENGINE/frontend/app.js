// Encryption Form Submission
const form = document.getElementById('encryptForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const dob = document.getElementById('dob').value;
    const country = document.getElementById('country').value;

console.log(`Date of Birth: ${dob}`);

    try {
        const response = await fetch('/encrypt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({fName, lName, email, number, dob, country})
        });

        const data = await response.json();

        document.getElementById('encryptedData').textContent = data.encryptedData;
        document.getElementById('iv').textContent = data.iv;
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});

// Decryption Form Submission






// Navbar Toggle
const myNav= document.querySelector('.myNav');
  const menu = document.querySelector('.menu');

  myNav.addEventListener('click', () => {
    myNav.classList.toggle('active');
    menu.classList.toggle('open');
  });
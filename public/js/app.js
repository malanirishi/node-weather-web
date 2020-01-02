const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';
    const location = searchInput.value;
    console.log(location);
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            console.log(data);
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});

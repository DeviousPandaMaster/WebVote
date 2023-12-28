document.getElementById('optionsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const optionsInput = document.getElementById('optionInput').value;
    const optionsArray = optionsInput.split(',').map(option => option.trim());

    fetch('/api/set_options', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ options: optionsArray })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        alert('Options set successfully!');
        document.getElementById('optionsForm').reset(); // Reset the form after successful submission
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to set options. Please try again.');
    });
});

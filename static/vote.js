// Get the radio buttons container element
const radioButtonsWrapElem = document.getElementById("radioButtonsWrapElem");

// Function to fetch data from an API endpoint and create radio buttons dynamically
function fetchDataAndCreateRadioButtons() {
    fetch('/api/vote_options') // Replace '/api/options' with your API endpoint
        .then(response => response.json())
        .then(data => {
            // Assuming the data returned is an array of options
            data.forEach(option => {
                let label = document.createElement("label");
                label.innerText = option.label; // Use the label property from your API response
                let input = document.createElement("input");
                input.type = "radio";
                input.name = "vote"; // Ensure all radio buttons have the same name to make them exclusive
                input.value = option.value; // Use the value property from your API response
                label.appendChild(input);
                radioButtonsWrapElem.appendChild(label);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the functions initially to create radio buttons and update the chart
fetchDataAndCreateRadioButtons();
// Function to update the chart with latest vote counts
function updateChart() {
    fetch('/api/read') // Replace '/api/vote_counts' with your vote counts API endpoint
        .then(response => response.json())
        .then(data => {
            // Assuming the data returned is in the format { option: count }
            const xValues = Object.keys(data);
            const yValues = Object.values(data);

            // Get the chart canvas context
            const ctx = document.getElementById('myChart').getContext('2d');

            // Check if chart already exists


            // Create a new Chart.js chart with updated vote counts
            window.myChart = new Chart(ctx, {
                type: "horizontalBar",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: "rgba(59,159,138,1.0)",
                        data: yValues
                    }]
                },
                options: {}
            });
        })
        .catch(error => {
            console.error('Error updating chart:', error);
        });
}

// Function to handle vote submission
document.getElementById('radioButtonsWrapElem').addEventListener('click', function(event) {
    event.preventDefault();

    // Get the selected value from the form
    const formData = new FormData();
    const voteValue = formData.get('vote');

    // Make a POST request to send the vote
    fetch('/api/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vote: voteValue })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        // Handle successful response
        // For instance, show a success message to the user
        alert('Vote submitted successfully!');
        // Update the chart after a successful vote
        updateChart();
    })
    .catch(error => {
        // Handle error scenarios
        console.error('There was a problem with the fetch operation:', error);
        // Display an error message to the user
        alert('Failed to submit vote. Please try again.');
    });
});


// Function to repeatedly update the chart with latest vote counts every second
function updateChartRepeatedly() {
    // Call updateChart initially to load the chart
    updateChart();

    // Set interval to update the chart every second
    setInterval(updateChart, 1000);
}

// Call the function to start updating the chart repeatedly
updateChartRepeatedly();

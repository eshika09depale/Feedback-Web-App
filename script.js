const feedbackButton = document.getElementById("submit-feedback");
const feedbackText = document.getElementById("feedback-text");
const ctx = document.getElementById('feedback-chart').getContext('2d');

// Chart.js setup
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Live Feedback Count',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Feedback Count'
                }
            }
        }
    }
});

// Function to submit feedback
feedbackButton.addEventListener('click', function() {
    const feedback = feedbackText.value.trim();
    if (feedback) {
        fetch('submit_feedback.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `feedback=${encodeURIComponent(feedback)}`
        }).then(response => response.text())
          .then(data => {
            console.log(data);
            feedbackText.value = ''; // Clear input
        });
    }
});

// Function to fetch live feedback data (for simplicity, we're polling every 5 seconds)
function fetchLiveFeedback() {
    fetch('get_live_feedback.php')
        .then(response => response.json())
        .then(data => {
            const time = new Date().toLocaleTimeString();
            chart.data.labels.push(time);
            chart.data.datasets[0].data.push(data.count);
            chart.update();
        });
}

// Polling for live feedback data
setInterval(fetchLiveFeedback, 5000);

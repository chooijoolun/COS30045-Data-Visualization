const ctx = document.getElementById('tvTechChart').getContext('2d');
const tvTechChart = new Chart(ctx, {
    type: 'bar', // You can change this to 'pie' or 'doughnut'
    data: {
        labels: ['LED', 'LCD', 'OLED'],
        datasets: [{
            label: 'Number of Models Available',
            data: [167, 115, 10], // These numbers come from your KNIME Sorted Table
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
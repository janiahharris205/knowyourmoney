// budget-planner.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Chart.js
    const ctx = document.getElementById('budgetChart').getContext('2d');
    const budgetChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Needs (50%)', 'Savings (20%)', 'Debt (10%)', 'Investments (20%)'],
            datasets: [{
                label: 'Budget Allocation',
                data: [50, 20, 10, 20], // Default percentages
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Budget Allocation Overview'
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });

    // Budget Planner Functionality
    document.getElementById('budgetForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const income = parseFloat(document.getElementById('income').value);
        const expenses = parseFloat(document.getElementById('expenses').value);
        const budgetResult = document.getElementById('budgetResult');

        if (income <= 0) {
            budgetResult.innerText = 'Income must be greater than zero.';
            budgetResult.style.color = 'red';
            return;
        }

        if (expenses < 0) {
            budgetResult.innerText = 'Expenses cannot be negative.';
            budgetResult.style.color = 'red';
            return;
        }

        const allocations = allocateBudget(income);
        budgetChart.data.datasets[0].data = allocations.map(value => (value / income) * 100);
        budgetChart.update();

        if (income > expenses) {
            budgetResult.innerText = `Surplus: $${(income - expenses).toFixed(2)}`;
            budgetResult.style.color = 'green';
        } else if (income < expenses) {
            budgetResult.innerText = `Deficit: $${(expenses - income).toFixed(2)}`;
            budgetResult.style.color = 'red';
        } else {
            budgetResult.innerText = 'Income matches expenses.';
            budgetResult.style.color = 'blue';
        }
    });

    // Function to allocate budget based on the 50/20/10/20 rule
    function allocateBudget(income) {
        return [
            income * 0.5, // Needs
            income * 0.2, // Savings
            income * 0.1, // Debt
            income * 0.2  // Investments
        ];
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Sample data - Replace with actual data from backend
    const financialData = {
        income: 5000, // Total monthly income
        expenses: 3000, // Total monthly expenses
        savings: 2000, // Net savings
        recentActivities: [
            'Paid $150 for groceries',
            'Received $2000 salary',
            'Invested $500 in stocks',
            'Paid $100 for utilities',
            'Transferred $300 to savings account'
        ]
    };

    // Update financial metrics
    document.getElementById('totalIncome').innerText = `$${financialData.income.toLocaleString()}`;
    document.getElementById('totalExpenses').innerText = `$${financialData.expenses.toLocaleString()}`;
    document.getElementById('netSavings').innerText = `$${financialData.savings.toLocaleString()}`;

    // Populate recent activities
    const activitiesList = document.getElementById('recent-activities-list');
    financialData.recentActivities.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = activity;
        activitiesList.appendChild(li);
    });

    // Set up the financial overview chart
    const ctx = document.getElementById('overviewChart').getContext('2d');
    const overviewChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Expenses', 'Savings'],
            datasets: [{
                data: [financialData.expenses, financialData.savings],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverOffset: 10,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Financial Allocation',
                    font: {
                        size: 18
                    }
                },
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
});

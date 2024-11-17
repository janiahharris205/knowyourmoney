document.addEventListener('DOMContentLoaded', () => {
    const financialData = {
        income: 0, // Total monthly income
        expenses: 0, // Total monthly expenses
        savings: 0, // Net savings
        recentActivities: [
            'Paid $150 for groceries',
            'Received $2000 salary',
            'Invested $500 in stocks',
            'Paid $100 for utilities',
            'Transferred $300 to savings account'
        ]
    };
    const activitiesList = document.getElementById('recent-activities-list');
    const editButtons = document.getElementById('editButtons');
    const addForm = document.getElementById('addForm');
    const removeForm = document.getElementById('removeForm');
    const toggleEditFormButton = document.getElementById('toggleEditForm');
    const showAddFormButton = document.getElementById('showAddFormButton');
    const showRemoveFormButton = document.getElementById('showRemoveFormButton');

     // Toggle visibility of Edit Transactions buttons
    toggleEditFormButton.addEventListener('click', () => {
        if (editButtons.style.display === 'none') {
            editButtons.style.display = 'block';
            toggleEditFormButton.textContent = 'Close Edit Transactions';
        } else {
            editButtons.style.display = 'none';
            toggleEditFormButton.textContent = 'Edit Transactions';
            addForm.style.display = 'none';
            removeForm.style.display = 'none';
        }
    });

    // Show Add Transaction Form
    showAddFormButton.addEventListener('click', () => {
        addForm.style.display = 'block';
        removeForm.style.display = 'none';
    });

    // Show Remove Transaction Form
    showRemoveFormButton.addEventListener('click', () => {
        removeForm.style.display = 'block';
        addForm.style.display = 'none';
    });

    const parseTransactions = () => {
        financialData.income = 0;
        financialData.expenses = 0;

        financialData.recentActivities.forEach(activity => {
            const amountMatch = activity.match(/(-?\d+(\.\d+)?)/);
            if (amountMatch) {
                const amount = parseFloat(amountMatch[0]);
                if (activity.toLowerCase().includes('paid') || activity.toLowerCase().includes('transferred') || activity.toLowerCase().includes('invested')) {
                    financialData.expenses += Math.abs(amount);
                } else {
                    financialData.income += amount;
                }
            }
        });

        financialData.savings = financialData.income - financialData.expenses;
    };

    const updateUI = () => {
        document.getElementById('totalIncome').innerText = `$${financialData.income.toLocaleString()}`;
        document.getElementById('totalExpenses').innerText = `$${financialData.expenses.toLocaleString()}`;
        document.getElementById('netSavings').innerText = `$${financialData.savings.toLocaleString()}`;
        
        // Clear and repopulate activities
        activitiesList.innerHTML = '';
        financialData.recentActivities.forEach(activity => {
            const li = document.createElement('li');
            li.textContent = activity;
            activitiesList.appendChild(li);
        });

        // Update the chart
        overviewChart.data.datasets[0].data = [financialData.expenses, financialData.savings];
        overviewChart.update();
    };

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

    const handleAddTransaction = (event) => {
        event.preventDefault();

        const description = document.getElementById('description').value.trim();
        const amount = parseFloat(document.getElementById('amount').value);

        if (description && !isNaN(amount)) {
            const formattedTransaction = `${description}`;
            financialData.recentActivities.push(formattedTransaction);

            if (description.toLowerCase().includes('paid') || description.toLowerCase().includes('transferred') || description.toLowerCase().includes('invested') || description.toLowerCase().includes('bought')) {
                financialData.expenses += Math.abs(amount);
            } else {
                financialData.income += amount;
            }

            financialData.savings = financialData.income - financialData.expenses;
            updateUI();

            // Clear form
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
        } else {
            alert('Please enter a valid description and amount.');
        }
    };

    const handleRemoveTransaction = (event) => {
        event.preventDefault();

        const index = parseInt(document.getElementById('removeIndex').value, 10) - 1;

        if (index >= 0 && index < financialData.recentActivities.length) {
            const removed = financialData.recentActivities.splice(index, 1)[0];

            const amountMatch = removed.match(/(-?\d+(\.\d+)?)/);
            if (amountMatch) {
                const amount = parseFloat(amountMatch[0]);

                if (removed.toLowerCase().includes('paid') || removed.toLowerCase().includes('transferred') || removed.toLowerCase().includes('invested') || removed.toLowerCase().includes('spent')) {
                    financialData.expenses -= Math.abs(amount);
                } else {
                    financialData.income -= amount;
                }

                financialData.savings = financialData.income - financialData.expenses;
                updateUI();
            }
        } else {
            alert('Invalid transaction index.');
        }
    };

    // Attach event listeners to forms
    document.getElementById('addTransactionForm').addEventListener('submit', handleAddTransaction);
    document.getElementById('removeTransactionForm').addEventListener('submit', handleRemoveTransaction);

    // Initialize data and UI
    parseTransactions();
    updateUI();
});

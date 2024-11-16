// Chart data
const chartData = {
    labels: ['Needs (50%)', 'Savings (20%)', 'Debt (10%)', 'Investments (20%)'],
    datasets: [{
        label: 'Financial Allocation',
        data: [2000, 800, 400, 800], // Default values
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
};

// Initialize the chart
const ctx = document.getElementById('financialChart').getContext('2d');
const financialChart = new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Financial Allocation Overview'
            },
            legend: {
                display: true
            }
        }
    }
});

// Function to allocate budget
function allocateBudget(income) {
    return [
        income * 0.5, // Needs
        income * 0.2, // Savings
        income * 0.1, // Debt
        income * 0.2  // Investments
    ];
}

// Budget Planner
document.getElementById('budgetForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    const budgetResult = document.getElementById('budgetResult');

    const allocations = allocateBudget(income);
    chartData.datasets[0].data = allocations;
    financialChart.update();

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

// Savings Goals Calculator
document.getElementById('savingsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const goalAmount = parseFloat(document.getElementById('goalAmount').value);
    const monthlySavings = parseFloat(document.getElementById('monthlySavings').value);
    const savingsResult = document.getElementById('savingsResult');

    if (monthlySavings <= 0) {
        savingsResult.innerText = 'Monthly savings must be greater than zero.';
        savingsResult.style.color = 'red';
        return;
    }

    const months = Math.ceil(goalAmount / monthlySavings);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let timeString = '';
    if (years > 0) {
        timeString += `${years} year(s) `;
    }
    if (remainingMonths > 0) {
        timeString += `${remainingMonths} month(s)`;
    }

    savingsResult.innerText = `You will reach your savings goal in ${timeString}.`;
    savingsResult.style.color = 'green';
});

// Quiz functionality
document.getElementById('startQuiz').addEventListener('click', function () {
    document.getElementById('quizContainer').classList.remove('hidden');
});

document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const responses = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
    };

    let score = 0;
    if (responses.q1 === 'yes') score++;
    if (responses.q2 === 'yes') score++;
    if (responses.q3 === 'yes') score++;

    const quizResult = document.getElementById('quizResult');
    quizResult.innerText = `Score: ${score}/3. ${
        score === 3 ? 'Excellent financial habits!' : 'Room for improvement.'
    }`;
    quizResult.style.color = score === 3 ? 'green' : 'orange';
});

// Investment Options
document.getElementById('investmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const riskTolerance = document.getElementById('riskTolerance').value;
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const investmentResult = document.getElementById('investmentResult');

    if (investmentAmount <= 0) {
        investmentResult.innerHTML = `<p>Please enter a valid investment amount.</p>`;
        investmentResult.style.color = 'red';
        return;
    }

    // Sample investment options based on risk tolerance
    let options = [];
    if (riskTolerance === 'low') {
        options = [
            '<a href="https://www.ally.com/bank/online-savings-account/" target="_blank" rel="noopener noreferrer">Ally Bank - Online Savings Account</a>',
            '<a href="https://www.capitalone.com/bank/certificates/" target="_blank" rel="noopener noreferrer">Capital One - Certificates of Deposit (CDs)</a>',
            '<a href="https://www.treasurydirect.gov/" target="_blank" rel="noopener noreferrer">U.S. Government Bonds</a>'
        ];
    } else if (riskTolerance === 'medium') {
        options = [
            '<a href="https://investor.vanguard.com/investment-products/index-funds" target="_blank" rel="noopener noreferrer">Vanguard - Index Funds</a>',
            '<a href="https://www.dividend.com/" target="_blank" rel="noopener noreferrer">Dividend-Paying Stocks</a>',
            '<a href="https://www.federalreserve.gov/" target="_blank" rel="noopener noreferrer">Corporate Bonds</a>'
        ];
    } else if (riskTolerance === 'high') {
        options = [
            '<a href="https://www.schwab.com/" target="_blank" rel="noopener noreferrer">Charles Schwab - Individual Stocks</a>',
            '<a href="https://www.coinbase.com/" target="_blank" rel="noopener noreferrer">Coinbase - Cryptocurrencies</a>',
            '<a href="https://www.realtor.com/investment-property/" target="_blank" rel="noopener noreferrer">Real Estate Investments</a>'
        ];
    }

    investmentResult.innerHTML = `<p>Based on your risk tolerance, consider the following investment options:</p>
    <ul>${options.map(option => `<li>${option}</li>`).join('')}</ul>`;
    investmentResult.style.color = '#2c3e50';
});

// Savings Account Recommendations
document.getElementById('savingsAccountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
    const monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    const accountFeatures = document.getElementById('accountFeatures').value;
    const savingsAccountResult = document.getElementById('savingsAccountResult');

    if (initialDeposit < 0 || monthlyDeposit < 0) {
        savingsAccountResult.innerHTML = `<p>Please enter valid deposit amounts.</p>`;
        savingsAccountResult.style.color = 'red';
        return;
    }

    // Sample recommendations based on selected features
    let recommendations = [];
    if (accountFeatures === 'highInterest') {
        recommendations = [
            `<a href="https://www.ally.com/bank/online-savings-account/" target="_blank" rel="noopener noreferrer">Ally Bank - High Yield Savings Account</a>`,
            `<a href="https://www.citibank.com/savings/" target="_blank" rel="noopener noreferrer">Citi Bank - Online Savings Account with Competitive Rates</a>`
        ];
    } else if (accountFeatures === 'noFees') {
        recommendations = [
            `<a href="https://www.chase.com/personal/savings-account" target="_blank" rel="noopener noreferrer">Chase Bank - No Fee Savings Account</a>`,
            `<a href="https://www.simple.com/" target="_blank" rel="noopener noreferrer">Simple - Free Savings Account with No Minimum Balance</a>`
        ];
    } else if (accountFeatures === 'onlineBanking') {
        recommendations = [
            `<a href="https://www.capitalone.com/bank/online-savings/" target="_blank" rel="noopener noreferrer">Capital One - Advanced Online Banking Platform</a>`,
            `<a href="https://www.monzo.com/" target="_blank" rel="noopener noreferrer">Monzo - User-Friendly Mobile Banking App</a>`
        ];
    }

    savingsAccountResult.innerHTML = `<p>Here are some savings accounts that match your preferences:</p>
    <ul>${recommendations.map(bank => `<li>${bank}</li>`).join('')}</ul>`;
    savingsAccountResult.style.color = '#2c3e50';
});

// Credit Card Recommendations
document.getElementById('creditCardForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const creditScore = document.getElementById('creditScore').value;
    const cardFeatures = document.getElementById('cardFeatures').value;
    const creditCardResult = document.getElementById('creditCardResult');

    // Sample credit card recommendations
    let recommendations = [];
    if (creditScore === 'poor') {
        recommendations = [
            `<a href="https://www.discover.com/credit-cards/secured/" target="_blank" rel="noopener noreferrer">Discover it® Secured Credit Card</a>`,
            `<a href="https://www.capitalone.com/credit-cards/bank-account/capital-one-cc/" target="_blank" rel="noopener noreferrer">Capital One® Secured Mastercard®</a>`
        ];
    } else if (creditScore === 'fair') {
        recommendations = [
            `<a href="https://www.citi.com/credit-cards/credit-builder/" target="_blank" rel="noopener noreferrer">Citi® Secured Mastercard®</a>`,
            `<a href="https://www.bankofamerica.com/credit-cards/fair-credit/" target="_blank" rel="noopener noreferrer">Bank of America® Cash Rewards Credit Card for Fair Credit</a>`
        ];
    } else if (['good', 'veryGood', 'excellent'].includes(creditScore)) {
        if (cardFeatures === 'cashBack') {
            recommendations = [
                `<a href="https://www.chase.com/personal/credit-cards/cash-back" target="_blank" rel="noopener noreferrer">Chase Freedom Unlimited®</a>`,
                `<a href="https://www.bankofamerica.com/credit-cards/cash-rewards/" target="_blank" rel="noopener noreferrer">Bank of America® Cash Rewards Credit Card</a>`
            ];
        } else if (cardFeatures === 'travelRewards') {
            recommendations = [
                `<a href="https://www.americanexpress.com/us/credit-cards/travel/" target="_blank" rel="noopener noreferrer">American Express® Gold Card</a>`,
                `<a href="https://www.chase.com/personal/credit-cards/travel/" target="_blank" rel="noopener noreferrer">Chase Sapphire Preferred® Card</a>`
            ];
        } else if (cardFeatures === 'lowInterest') {
            recommendations = [
                `<a href="https://www.citi.com/credit-cards/low-interest/" target="_blank" rel="noopener noreferrer">Citi® Diamond Preferred® Card</a>`,
                `<a href="https://www.bankofamerica.com/credit-cards/low-interest/" target="_blank" rel="noopener noreferrer">Bank of America® Customized Cash Rewards Credit Card</a>`
            ];
        } else if (cardFeatures === 'balanceTransfer') {
            recommendations = [
                `<a href="https://www.chase.com/personal/credit-cards/balance-transfer" target="_blank" rel="noopener noreferrer">Chase Slate® Edge℠</a>`,
                `<a href="https://www.discover.com/credit-cards/balance-transfer/" target="_blank" rel="noopener noreferrer">Discover it® Balance Transfer</a>`
            ];
        }
    }

    if (recommendations.length > 0) {
        creditCardResult.innerHTML = `<p>Based on your inputs, consider the following credit cards:</p>
        <ul>${recommendations.map(card => `<li>${card}</li>`).join('')}</ul>`;
        creditCardResult.style.color = '#2c3e50';
    } else {
        creditCardResult.innerHTML = `<p>No specific recommendations available. Please try adjusting your inputs.</p>`;
        creditCardResult.style.color = 'orange';
    }
});

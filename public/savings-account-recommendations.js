// savings-account-recommendations.js

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

// investment-options.js

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
            `<a href="https://www.ally.com/bank/online-savings-account/" target="_blank" rel="noopener noreferrer">Ally Bank - Online Savings Account</a>`,
            `<a href="https://www.capitalone.com/bank/certificates/" target="_blank" rel="noopener noreferrer">Capital One - Certificates of Deposit (CDs)</a>`,
            `<a href="https://www.treasurydirect.gov/" target="_blank" rel="noopener noreferrer">U.S. Government Bonds</a>`
        ];
    } else if (riskTolerance === 'medium') {
        options = [
            `<a href="https://investor.vanguard.com/investment-products/index-funds" target="_blank" rel="noopener noreferrer">Vanguard - Index Funds</a>`,
            `<a href="https://www.dividend.com/" target="_blank" rel="noopener noreferrer">Dividend-Paying Stocks</a>`,
            `<a href="https://www.federalreserve.gov/" target="_blank" rel="noopener noreferrer">Corporate Bonds</a>`
        ];
    } else if (riskTolerance === 'high') {
        options = [
            `<a href="https://www.schwab.com/" target="_blank" rel="noopener noreferrer">Charles Schwab - Individual Stocks</a>`,
            `<a href="https://www.coinbase.com/" target="_blank" rel="noopener noreferrer">Coinbase - Cryptocurrencies</a>`,
            `<a href="https://www.realtor.com/investment-property/" target="_blank" rel="noopener noreferrer">Real Estate Investments</a>`
        ];
    }

    investmentResult.innerHTML = `<p>Based on your risk tolerance, consider the following investment options:</p>
    <ul>${options.map(option => `<li>${option}</li>`).join('')}</ul>`;
    investmentResult.style.color = '#2c3e50';
});

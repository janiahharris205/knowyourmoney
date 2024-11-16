// credit-card-recommendations.js

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

// savings-calculator.js

document.getElementById('savingsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const goalAmount = parseFloat(document.getElementById('goalAmount').value);
    const monthlySavings = parseFloat(document.getElementById('monthlySavings').value);
    const savingsResult = document.getElementById('savingsResult');

    if (goalAmount <= 0) {
        savingsResult.innerText = 'Savings goal must be greater than zero.';
        savingsResult.style.color = 'red';
        return;
    }

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

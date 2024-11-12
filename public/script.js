function showTab(tabId) {
    // Hide all tab content
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show the selected tab
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('active');
}

// Initialize by showing the Home tab
const slides = [
    "Savings Account: A safe place to keep your money and earn a little bit of interest over time.",
    "Checking Account: Where you can easily access your money for spending and everyday needs.",
    "Roth IRA: A retirement account where you can save money that grows tax-free for the future.",
    "Investment Account: Invest in stocks, bonds, and more to grow your money over time.",
    "Education Savings Account: Save for your future education expenses!"
];

let currentSlide = 0;

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    document.getElementById("slide-text").textContent = slides[currentSlide];
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    document.getElementById("slide-text").textContent = slides[currentSlide];
}


function calculateInvestment() {
    const amount = parseFloat(document.getElementById("amount").value);
    const years = parseInt(document.getElementById("years").value);
    const rate = parseFloat(document.getElementById("rate").value);

    if (isNaN(amount) || isNaN(years) || isNaN(rate)) {
        document.getElementById("result").textContent = "Please enter valid numbers.";
        return;
    }

    const futureValue = amount * Math.pow(1 + rate / 100, years);
    document.getElementById("result").textContent = 
        `After ${years} years, your investment could grow to $${futureValue.toFixed(2)}!`;
}

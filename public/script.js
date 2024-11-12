const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalCheckin = document.getElementById("modal-checkin");
const modalOptions = document.getElementById("modal-options");
const modalFeedback = document.getElementById("modal-feedback");
const nextButton = document.getElementById("next-button");
const infoSection = document.getElementById("info-section");
const quizSection = document.getElementById("quiz-section");

const descriptions = {
    // Basic Financial Concepts
    "income-types": {
        title: "Income Types",
        description: "Income is the money you receive regularly, from sources like a salary, freelancing, or investments. It can be categorized as active (earned through work) or passive (earned from investments, rental income, etc.).",
        question: "What are two types of income?",
        options: ["Active and Passive", "Fixed and Variable", "Credit and Debit"],
        correctAnswer: "Active and Passive"
    },
    "expenses": {
        title: "Expenses (Fixed vs. Variable)",
        description: "Expenses are the costs you incur. Fixed expenses remain the same each month, like rent. Variable expenses fluctuate based on usage, such as groceries and utilities.",
        question: "Which is an example of a fixed expense?",
        options: ["Groceries", "Rent", "Entertainment"],
        correctAnswer: "Rent"
    },
    "budgeting": {
        title: "Budgeting",
        description: "A budget is a financial plan that allocates income towards expenses, savings, and debt repayment. It helps you control spending and achieve financial goals.",
        question: "Why is creating a budget important?",
        options: ["To track spending", "To earn interest", "To increase income"],
        correctAnswer: "To track spending"
    },
    "surplus-deficit": {
        title: "Surplus vs. Deficit",
        description: "A surplus means you have more income than expenses. A deficit means your expenses exceed your income. Surpluses help in saving and investing.",
        question: "What does it mean to have a surplus in your budget?",
        options: ["You have extra money", "You owe money", "Your income is lower than expenses"],
        correctAnswer: "You have extra money"
    },

    // Banking Essentials
    "checking-savings": {
        title: "Checking vs. Savings Accounts",
        description: "A checking account is for daily transactions, while a savings account is for storing money long-term and often earns interest.",
        question: "What is the primary purpose of a savings account?",
        options: ["Daily spending", "Long-term savings", "Investing in stocks"],
        correctAnswer: "Long-term savings"
    },
    "interest-rates": {
        title: "Interest Rates",
        description: "Interest rates are the percentage of your money that a bank pays you for keeping funds in a savings account, or the cost of borrowing money from a lender.",
        question: "How does an interest rate impact your savings?",
        options: ["It decreases your balance", "It increases your balance", "It has no effect"],
        correctAnswer: "It increases your balance"
    },
    "overdrafts": {
        title: "Overdrafts",
        description: "An overdraft occurs when you withdraw more than your account balance, often leading to fees. Some accounts offer overdraft protection to prevent fees.",
        question: "What happens when you have an overdraft?",
        options: ["You incur a fee", "You earn interest", "Nothing happens"],
        correctAnswer: "You incur a fee"
    },
    "credit-debit": {
        title: "Credit vs. Debit",
        description: "Credit allows you to borrow money to pay back later, usually with interest. Debit directly uses funds from your bank account with no borrowing involved.",
        question: "What’s the main difference between credit and debit?",
        options: ["Credit involves borrowing", "Debit incurs interest", "Credit uses saved funds"],
        correctAnswer: "Credit involves borrowing"
    },

    // Saving and Investing
    "emergency-funds": {
        title: "Emergency Funds",
        description: "An emergency fund is a savings account with money set aside for unexpected expenses, such as medical bills or car repairs. It provides financial security.",
        question: "Why is it important to have an emergency fund?",
        options: ["For vacation", "For emergencies", "For retirement"],
        correctAnswer: "For emergencies"
    },
    "investment-accounts": {
        title: "Investment Accounts",
        description: "Investment accounts, like brokerage or retirement accounts, allow you to invest in stocks, bonds, and other assets to grow your wealth.",
        question: "What is the purpose of an investment account?",
        options: ["To pay bills", "To save cash", "To grow wealth"],
        correctAnswer: "To grow wealth"
    },
    "risk-return": {
        title: "Risk and Return",
        description: "Risk is the chance of losing money on an investment, while return is the potential gain. Higher risks often come with higher potential returns.",
        question: "How are risk and return related in investing?",
        options: ["Higher risk, higher return", "Higher risk, lower return", "Risk doesn't affect return"],
        correctAnswer: "Higher risk, higher return"
    },
    "compound-interest": {
        title: "Compound Interest",
        description: "Compound interest is the interest on both the initial amount and any accumulated interest. This accelerates growth over time, especially in long-term investments.",
        question: "What makes compound interest powerful for growing savings?",
        options: ["It decreases principal", "It compounds over time", "It reduces interest"],
        correctAnswer: "It compounds over time"
    },

    // Managing Debt
    "types-of-debt": {
        title: "Types of Debt",
        description: "Debt can be 'good' or 'bad'. Good debt, like student loans, can improve your future financial situation. Bad debt, like credit card debt, often has high interest rates.",
        question: "Can you think of an example of good debt?",
        options: ["Student loans", "Credit card debt", "Payday loans"],
        correctAnswer: "Student loans"
    },
    "credit-scores": {
        title: "Credit Scores",
        description: "A credit score is a number representing your creditworthiness. Higher scores mean you’re more likely to get loans with better interest rates.",
        question: "Why is having a good credit score beneficial?",
        options: ["Better loan terms", "Higher taxes", "More fees"],
        correctAnswer: "Better loan terms"
    },
    "loans": {
        title: "Loans and Mortgages",
        description: "A loan is borrowed money you repay with interest. Mortgages are loans specifically for purchasing property, usually with lower interest rates.",
        question: "What type of loan is typically used for buying a home?",
        options: ["Mortgage", "Auto loan", "Student loan"],
        correctAnswer: "Mortgage"
    },
    "debt-repayment": {
        title: "Debt Repayment Strategies",
        description: "Strategies like the snowball and avalanche methods help you pay off debt. The snowball method focuses on paying the smallest debt first; the avalanche focuses on the highest interest rate.",
        question: "Which debt repayment method targets the highest interest debt first?",
        options: ["Avalanche", "Snowball", "Balance transfer"],
        correctAnswer: "Avalanche"
    },

    // Financial Planning
    "financial-goals": {
        title: "Setting Financial Goals",
        description: "Financial goals help you determine your saving and spending priorities. Goals can be short-term (emergency fund) or long-term (retirement savings).",
        question: "Why is it important to set financial goals?",
        options: ["To plan your finances", "To increase debt", "To lower your income"],
        correctAnswer: "To plan your finances"
    },
    "retirement-accounts": {
        title: "Retirement Accounts",
        description: "Retirement accounts, such as 401(k) or IRA, offer tax benefits and encourage long-term savings for retirement.",
        question: "Can you name a type of retirement account?",
        options: ["401(k)", "Savings account", "Checking account"],
        correctAnswer: "401(k)"
    },
    "insurance": {
        title: "Insurance Basics",
        description: "Insurance provides financial protection against unexpected losses. Types include health, auto, life, and property insurance.",
        question: "What is one type of insurance you might consider for protection?",
        options: ["Health insurance", "Lottery ticket", "Gift card"],
        correctAnswer: "Health insurance"
    },
    "asset-allocation": {
        title: "Asset Allocation",
        description: "Asset allocation is the strategy of dividing your investments among different asset categories, like stocks and bonds, based on risk tolerance and time horizon.",
        question: "Why is asset allocation important in investing?",
        options: ["To manage risk", "To increase spending", "To avoid taxes"],
        correctAnswer: "To manage risk"
    }
};


function showModal(term) {
    const data = descriptions[term];
    modalTitle.innerText = data.title;
    modalDescription.innerText = data.description;
    modalCheckin.innerText = data.question;

    // Populate quiz options
    modalOptions.innerHTML = "";
    data.options.forEach(option => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.innerText = option;
        button.onclick = () => checkAnswer(option, data.correctAnswer);
        modalOptions.appendChild(button);
    });

    // Clear previous feedback and show the information section
    modalFeedback.innerText = "";
    infoSection.style.display = "block";
    quizSection.style.display = "none";
    modal.style.display = "flex";
}

function showQuiz() {
    // Transition to the quiz section
    infoSection.style.display = "none";
    quizSection.style.display = "block";
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        modalFeedback.innerText = "Correct! Well done!";
        modalFeedback.style.color = "green";
    } else {
        modalFeedback.innerText = `Incorrect. The correct answer is: ${correct}`;
        modalFeedback.style.color = "red";
    }
}

function closeModal() {
    modal.style.display = "none";
}

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
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

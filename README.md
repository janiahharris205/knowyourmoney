# Know Your Money

## Overview
Know Your Money is a web application designed to empower young adults, particularly college students, to manage their finances effectively. The app provides tools for budgeting, expense tracking, and personalized financial advice, fostering habits for long-term financial stability and success.

## Features
- **Budgeting Tools**: Set budgets for different spending categories and track expenses in real-time.
- **Expense Tracking**: Visualize spending patterns with an interactive expense pie chart.
- **Personalized Financial Advice**: Receive insights and tips tailored to individual financial goals.
- **Investment Tracking**: Monitor investments and predict future growth.

## Tech Stack
- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js
- **API Integration**: Plaid API for secure financial account connections
- **Visualization**: Chart.js for interactive charts

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your local machine
- MongoDB server or a MongoDB Atlas account

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/janiah.harris205/know-your-money.git
   ```
2. Navigate to the project directory:
   ```bash
   cd know-your-money
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory with the following:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   PLAID_CLIENT_ID=your-client-id
   PLAID_SECRET=your-secret
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the app in your browser at `http://localhost:5000`.

## Usage
1. Sign up or log in to your account.
2. Connect your financial accounts using the Plaid API.
3. Set budgets for categories like food, rent, and entertainment.
4. Track your expenses with visual insights from the expense pie chart.
5. Explore investment and retirement tools to plan for the future.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- The Girls Who Code Leadership Academy for support and guidance.
- The developers of Plaid API and Chart.js for providing powerful tools to enhance the application.

## Contact
For questions or feedback, please contact janiah.harris205@gmail.com.

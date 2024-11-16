//function to create the Plaid Link
function createPlaidLink() {

  console.log('UUID library loaded:', typeof uuid);  //should log 'object'

  console.log("Button clicked, creating Plaid Link...");


  //get the unique user ID
  const userId = localStorage.getItem("userId") || uuid.v4();
  console.log(uuid);

  //make an API call to your backend to create the link token
  fetch('http://localhost:3000/create-link-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: userId }),  //pass the clientUserId to the server
  })
    .then(response => response.json())
    .then(data => {
      console.log('Response Data:', data);
      const linkToken = data.link_token;  //get the link_token from the server response

      //initialize Plaid Link with the obtained link_token
      const handler = Plaid.create({
        clientName: 'Know Your Money',
        env: 'sandbox',
        token: linkToken,  //pass the link_token
        product: ['transactions'],  //product type
        onSuccess: function(public_token, metadata) {
          //after the user successfully links their account, send the public_token to the backend
          console.log('Public token:', public_token);
          exchangePublicToken(public_token);
        },
      });

      handler.open();  //open Plaid Link flow
    })
    .catch((error) => {
      console.error('Error creating Plaid link:', error);
    });
}

//function to exchange the public_token for an access token (backend)
function exchangePublicToken(publicToken) {
  fetch('http://localhost:3000/exchange-public-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ public_token: publicToken }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        console.log('Access token:', data.access_token);  //save the access token securely
      } else {
        throw new Error("Access token missing in server response");
      }
    })
    .catch((error) => {
      console.error('Error exchanging public token:', error);
    });
}

//attach the function to the button click event
document.getElementById('plaid-button').addEventListener('click', createPlaidLink);

//function to fetch transaction data
async function fetchTransactions() {
  const userId = req.query.userId;
  const response = await fetch(`/api/transactions?userId=${encodeURIComponent(userId)}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch transactions');
    }
    const data = await response.json();
    return data.transactions;
}

function processTransactions(transactions) {
  const categoryTotals = {};
  if (!Array.isArray(transactions)) {
      return categoryTotals; //return an empty result if transactions is not an array
  }
  transactions.forEach(transaction => {
      const { category, amount } = transaction;
      if (category && amount) {
          if (!categoryTotals[category]) {
              categoryTotals[category] = 0;
          }
          categoryTotals[category] += amount;
      }
  });
  return categoryTotals;
}


function formatChartData(categoryTotals) {
  return {
      labels: Object.keys(categoryTotals),
      datasets: [
          {
              data: Object.values(categoryTotals),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          }
      ]
  };
}

async function setupAccessTokenIfNeeded() {
  try {
      const response = await fetch('/api/check-access-token');
      const data = await response.json();

      if (data.hasAccessToken) {
          console.log('Access token is set.');
          return; // Exit successfully if access token exists
      } else {
          throw new Error('Access token not set.');
      }
  } catch (error) {
      console.error('Error checking access token:', error);
      throw new Error('Access token not set up. Please connect your bank.');
  }
}



//function to handle Plaid Link success
async function onPlaidLinkSuccess(publicToken) {
  try {
      const response = await fetch('/exchange-public-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token: publicToken }),
      });
      const data = await response.json();

      if (data.access_token) {
          console.log('Access token successfully exchanged:', data.access_token);
          await renderChart(); // Call renderChart after the token is set
      } else {
          throw new Error('Access token exchange failed.');
      }
  } catch (error) {
      console.error('Error exchanging public token:', error);
      alert('Failed to connect your bank. Please try again.');
  }
}

async function renderChart() {
  try {
      console.log('Setting up access token...');
      await setupAccessTokenIfNeeded(); // Ensure access token is set

      console.log('Fetching transactions...');
      const transactions = await fetchTransactions(); // Fetch transactions

      if (!transactions || transactions.length === 0) {
          console.warn('No transactions found.');
          alert('No transactions available. Please connect your bank and try again.');
          return;
      }

      console.log('Processing transactions...');
      const categoryTotals = processTransactions(transactions);
      const chartData = formatChartData(categoryTotals);

      const ctx = document.getElementById('expenseChart').getContext('2d');
      new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: {
              responsive: true,
              plugins: {
                  legend: { position: 'top' },
                  tooltip: {
                      callbacks: {
                          label: function (context) {
                              let label = context.label || '';
                              if (label) {
                                  label += ': ';
                              }
                              label += `$${context.raw.toFixed(2)}`;
                              return label;
                          },
                      },
                  },
              },
          },
      });

      console.log('Chart rendered successfully.');
  } catch (error) {
      console.error('Error rendering chart:', error);
      alert('Failed to load transactions. Please connect your bank and try again.');
  }
}




window.onload = renderChart;

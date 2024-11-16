const express = require('express');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const dotenv = require('dotenv');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); 
const moment = require('moment');

dotenv.config();  //load environment variables from .env file

//initialize Plaid configuration
console.log(PlaidEnvironments);

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});

const plaidClient = new PlaidApi(configuration);
console.log('Plaid client initialized successfully');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));


//simulating user authentication
let users = {};  //in-memory store of users

//route to create Plaid link token
app.post('/create-link-token', (req, res) => {
    const userId = req.body.userId;
  
    if (!userId) {
        console.log('User ID missing in the request');
        return res.status(400).json({ error: 'userId is required' });
    }
  
    console.log('Creating Plaid Link Token for userId:', userId);
  
    plaidClient.linkTokenCreate({
        user: { client_user_id: userId },
        client_name: 'Know Your Money',
        products: ['transactions'],
        country_codes: ['US'],
        language: 'en',
    })
    .then((response) => {
        const linkToken = response.data.link_token;
        console.log('Link Token created:', linkToken);
        res.json({ link_token: linkToken });
    })
    .catch((error) => {
        console.error('Error generating link token:', error);
  
      //log the full error response to see more details
        if (error.response) {
            console.error('Error response:', error.response.data);
        } else {
            console.error('Error message:', error.message);
        }
  
      //send a detailed error response
        res.status(500).json({
            error: 'Error generating link token',
            details: error.response ? error.response.data : error.message,
        });
    });
});
  
//route to exchange public token for access token
app.post('/exchange-public-token', async (req, res) => {
    const publicToken = req.body.public_token;
  
    try {
        const exchangeResponse = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });
        accessToken = exchangeResponse.data.access_token;
        console.log('Access token created', accessToken)
  
        res.json({
            access_token: accessToken,
            item_id: exchangeResponse.data.item_id,
        });
    }
    catch (err) {
        console.error('Error exchanging public token:', err);
        res.status(500).json({ error: 'Error exchanging public token' });
    }
});

//check that access token exists
app.get('/api/check-access-token', (req, res) => {
    const userId = req.query.userId;
    if (!userId || !users[userId] || !users[userId].accessTokens.length) {
        return res.json({ hasAccessToken: false });
    }
    res.json({ hasAccessToken: true });
});


// API endpoint to get transactions
app.get('/api/transactions', async (req, res) => {
    const userId = req.query.userId;

    //validate that the user and access token exist
    if (!userId || !users[userId] || !users[userId].accessTokens.length) {
        return res.status(400).json({ error: 'User or access token not found. Ensure the token is created first.' });
    }

    const accessToken = users[userId].accessTokens[0].access_token;
    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');

    try {
        const transactionsResponse = await plaidClient.transactionsGet({
            access_token: accessToken,
            start_date: startDate,
            end_date: endDate,
        });
        const transactions = transactionsResponse.data.transactions;
        users[userId].transactions = transactions;

        res.json({ transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Error fetching transactions' });
    }
});



//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

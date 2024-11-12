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

//function to exchange the public_token for an access token (Backend)

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
        console.log('Access token:', data.access_token);  // Save the access token securely
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
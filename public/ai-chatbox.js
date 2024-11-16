async function sendMessage() {
    const question = document.getElementById('userQuestion').value;
    if (!question) {
        alert("Please enter a question.");
        return;
    }

    try {
        // Prepare the request payload
        const requestBody = JSON.stringify({
            text: question  // Text input for text generation
        });

        console.log("Request Body:", requestBody);  // Log the request body for verification

        const response = await fetch('https://api.deepai.org/api/text-generator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': 'bfdad666-438b-4850-9e9e-8c81267b9f17'  // Replace with your actual DeepAI API key
            },
            body: requestBody
        });

        console.log("DeepAI Response status:", response.status);  // Log the HTTP status

        // If the response status is not OK, log the error message directly
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error Response from DeepAI:", errorText);  // Log the exact error response
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse and display the response data
        const data = await response.json();
        console.log("DeepAI Data:", data);  // Log the response data for inspection

        document.getElementById('chatResponse').innerText = data.output || "No output available";

    } catch (error) {
        console.error("Error in sendMessage function:", error);
        document.getElementById('chatResponse').innerText = "Sorry, something went wrong. Please try again later.";
    }
}

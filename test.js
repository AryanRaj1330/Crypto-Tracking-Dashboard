async function convertEurToJpy() {
    try {
      // CoinGecko API URL to get the conversion rate
      let baseURL = `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=jpy`;
  
      // Fetch the data from the API
      let response = await fetch(baseURL, {
        method: 'GET',
        headers: new Headers({
          'accept': 'application/json',
          "x-cg-demo-api-key":"CG-89eAtZqtbTUwJ9wpYh9zmNMy"

        })
      });
  
      // Handle response errors
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Parse the JSON response
      let data = await response.json();
  
      // Extract the conversion rate
      let rate = data.usd.jpy;
      console.log(`1 EUR = ${rate} JPY`);
  
      // Display the conversion rate in the console or DOM
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  
  // Call the function
  convertEurToJpy();
  
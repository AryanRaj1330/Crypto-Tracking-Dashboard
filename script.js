async function convertEurToInr() {
    try {
      let baseURL = `https://api.coingecko.com/api/v3/simple/price?ids=eur&vs_currencies=usd`;
  
      let response = await fetch(baseURL, {
        method: 'GET',
        headers: new Headers({
          'accept': 'application/json',
          "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
        })
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      let data = await response.json();
      console.log(data);
      
      let rate = data.eur.usd; // Retrieve the rate for EUR to INR
      console.log(`1 EUR = ${rate} INR`);
      
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  
  convertEurToInr();
  
async function fetchData(){
  try{
    let response =await fetch(new Request("https://v6.exchangerate-api.com/v6/471272ad8bae7a9de90e86ad/pair/EUR/BTC"))

    let data= await response.json()

    console.log(data.conversion_rate)

  }
  catch(error){
    console.log(`error=${error}`)
  }
}

fetchData()
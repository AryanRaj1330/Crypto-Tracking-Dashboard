async function fetchCurrencyData(){
  let currency=["BTC","ETH","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

  for(let coin of currency){
      try{
          let response= await fetch(new Request("https://api.livecoinwatch.com/coins/single"),{
              method:"POST",
              headers: new Headers({
                  "content-type":"application/json",
                  "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
              }),
              body:JSON.stringify({
                  currency:"USD",
                  code:coin,
                  offset:0,
                  limit:10,
                  meta:false
              })
          })

          let data= await response.json()

          let priceUSD=document.getElementById(coin)
          priceUSD.textContent=`$${data.rate.toFixed(2)}`

          let cap=document.getElementById(`${coin}cap`)
          cap.textContent=data.cap

          let volume=document.getElementById(`${coin}volume`)
          volume.textContent=data.volume

          let delta=document.getElementById(`${coin}delta`)
          let change=data.delta.day
          if(change<1){
              delta.style.color='red'
          }
          else if(change>=1){
              delta.style.color='green'
          }
          delta.textContent=change
      }
      catch(error){
        console.log(error)

          priceUSD.textContent="Error"
          cap.textContent="Error"
          volume.textContent="Error"
          delta.textContent="Error"
      }
  }
}

fetchCurrencyData()

async function fetchPriceInr(){
  let currency=["BTC","ETH","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

  for(let coin of currency){
      try{
          let responseInr= await fetch(("https://api.livecoinwatch.com/coins/single"),{
              method:"POST",
              headers: new Headers({
                  "content-type":"application/json",
                  "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
              }),
              body:JSON.stringify({
                  currency:"INR",
                  code:coin,
                  offset:0,
                  limit:10,
                  meta:false
              })
          })
      
          let dataInr= await responseInr.json()
      
          let priceINR=document.getElementById(`${coin}inr`)
          priceINR.textContent=`₹${dataInr.rate.toFixed(2)}`
      }

      catch(error){
        console.log(error)

          priceINR.textContent="Error"
      }
  }
}

fetchPriceInr()
async function fetchPriceUSD(){
    let coins=["BTC","ETH","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

    for(let code of coins){
        await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
            method:"POST",
            headers: new Headers({
              "content-type":"application/json",
              "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3",
            }),
            body:JSON.stringify({
              currency:"USD",
              code:code,
              meta:false,
            }),
          }).then(response=> response.json())
            .then(data=>{
                let price=document.getElementById(`${code}`)
                price.textContent=data.rate.toFixed(2) 
            })
            .catch(error=>{
              let usdError=document.getElementById(`${code}`)
              usdError.textContent="Error"
            });
    }
}

fetchPriceUSD()

async function fetchPriceINR(){
    let coins=["BTC","ETH","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

    for(let code of coins){
        await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
            method:"POST",
            headers: new Headers({
              "content-type":"application/json",
              "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3",
            }),
            body: JSON.stringify({
              currency:"INR",
              code:code,
              meta:false,
            }),
          }).then(response=> response.json())
            .then(data=>{
                let price=document.getElementById(`${code}inr`)
                price.textContent=data.rate.toFixed(2) 
            })
            .catch(error=>{
              let inrError=document.getElementById(`${code}inr`)
              inrError.textContent="Error"
            });
    }
}

fetchPriceINR()


async function fetchChange(){
    let coins=["BTC","ETH","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

    for(let code of coins){
        await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
            method:"POST",
            headers: new Headers({
              "content-type":"application/json",
              "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3",
            }),
            body: JSON.stringify({
              currency:"USD",
              offset:0,
              limit:10,
              code:code,
              meta:false,
            }),
          }).then(response=> response.json())
            .then(data=>{
                let delta=document.getElementById(`${code}delta`)
                let deltaValue=data.delta.day
                if(deltaValue<1){
                    delta.style.color='red'
                }
                else if(deltaValue>=1){
                    delta.style.color='green'
                }
                delta.textContent=data.delta.day.toFixed(2) 
            })
            .catch(error=>{
              let changeError=document.getElementById(`${code}delta`)
              changeError.textContent="Error"
            });
    }
}

fetchChange()

async function fetchCap(){
    let coins=["BTC","ETH","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

    for(let code of coins){
        await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
            method:"POST",
            headers: new Headers({
              "content-type":"application/json",
              "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3",
            }),
            body:JSON.stringify({
              currency:"USD",
              code:code,
              meta:false,
            }),
          }).then(response=> response.json())
            .then(data=>{
                let capShow=document.getElementById(`${code}cap`)
                let cap=data.cap.toFixed(2)
                capShow.textContent=cap
            })
            .catch(error=>{
              let capError=document.getElementById(`${code}cap`)
              capError.textContent="Error"
            });
    }
}

fetchCap()

async function fetchVolume(){
  let coins=["BTC","ETH","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

  for(let code of coins){
      await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
          method:"POST",
          headers: new Headers({
            "content-type":"application/json",
            "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3",
          }),
          body:JSON.stringify({
            currency:"USD",
            code:code,
            meta:false,
          }),
        }).then(response=> response.json())
          .then(data=>{
            console.log(data.volume)
              let volume=data.volume
              let volumeShow=document.getElementById(`${code}volume`)
              volumeShow.textContent=volume
          })
          .catch(error=>{
            let errorVolume=document.getElementById(`${code}volume`)
            errorVolume.textContent="Error"
          });
  }
}

fetchVolume()
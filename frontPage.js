async function fetchCurrencyData(){
  let currency=["BTC","ETH","BNB","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

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
              delta.style.color="red"
          }
          else if(change>=1){
              delta.style.color="green"
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
  let currency=["BTC","ETH","BNB","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]

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
        console.log(`error-${error}`)

          priceINR.textContent="Error"
      }
  }
}

fetchPriceInr()

// All in one currency convertor

function isSubSet(array,code){
    let length=array.length
    for(let i=0;i<length;i++){
        if(array[i]===code){
            return false
        }
    }
    return true
}



let currencyCode=["BTC","ETH","BNB","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]



let countryCurrencies = [
    "AED", "AFN", "XCD", "ALL", "AMD", "ANG", "AOA", "AQD", "ARS", "AUD", "AZN", 
    "BAM", "BBD", "BDT", "XOF", "BGN", "BHD", "BIF", "BMD", "BND", "BO", "BRL", 
    "BSD", "NOK", "BWP", "BYR", "BZD", "CAD", "CDF", "XAF", "CHF", "CLP", "CNY", 
    "COP", "CRC", "CUP", "CVE", "CYP", "CZK", "DJF", "DKK", "DOP", "DZD", "ECS", 
    "EEK", "EGP", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", 
    "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", 
    "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", 
    "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", 
    "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MTL", 
    "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "XPF", "NGN", "NIO", "NPR", 
    "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", 
    "RSD", "RUB", "RWF", "RW", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SKK", 
    "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SY", "SZL", "THB", "TJS", "TMT", 
    "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UA", "UGX", "USD", "UY", "UZ", 
    "VE", "VND", "VU", "YER", "ZA", "ZM", "ZW"
  ]

let from=document.querySelector("#from select")
let to=document.querySelector("#to select")




async function fetchPrice(from,to){
    try{
        let response=await fetch(new Request("https://api.livecoinwatch.com/coins/single"),{
            method:"POST",
            headers:new Headers({
                "content-type":"application/json",
                "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
            }),
            body:JSON.stringify({
                currency:to,
                code:from,
                offset:0,
                limit:1,
                meta:false
            })
        })

        let data= await response.json()

        return data.rate
    }

    catch(error){
        console.log(`error-${error}`)
    }
}



let selectOption=document.querySelectorAll("select")

for(let select of selectOption){
    for(let code of currencyCode){
        let newOption=document.createElement("option")
        newOption.innerText=code
        newOption.value=code
        select.appendChild(newOption)
    }
}

for(let select of selectOption){
    for(let code of countryCurrencies){
        let newOption=document.createElement("option")
        newOption.innerText=code
        newOption.value=code
        select.appendChild(newOption)
    }
}

let button=document.getElementById("result")

button.addEventListener("click",async(event)=>{
    event.preventDefault()
    let amount=document.getElementById("amount")
    let amtValue=amount.value;
    if(amtValue===""||amtValue<0){
        amtValue=0
        amount.value="0"
    }

    if(isSubSet(currencyCode,from.value)&&isSubSet(currencyCode,to.value)){
        async function fetchFiat(){
            try{
                let response =await fetch(new Request(`https://v6.exchangerate-api.com/v6/471272ad8bae7a9de90e86ad/pair/${from.value}/${to.value}`))

                let data= await response.json()

                let ex=data.conversion_rate
                let ans=ex*amtValue

                document.getElementById("finalAns").textContent=ans.toFixed(2)
            }
            catch(error){
                console.log(`error=${error}`)
            }
        }
        fetchFiat()
    }
    else if(isSubSet(currencyCode,from.value)&&!isSubSet(currencyCode,to.value)){
        console.log("condition is correct")
        let ans=await fetchPrice(to.value,from.value)
        let finalAns=(1/ans)*amtValue
        document.getElementById("finalAns").textContent=finalAns.toFixed(2)
    }
    else{
        let ans=await fetchPrice(from.value,to.value)
        let finalAns=ans*amtValue
        document.getElementById("finalAns").textContent=finalAns.toFixed(2)
    }
})

// search button activation

let srchBtn=document.querySelector("#navButton")


function search(){
    let srchText=document.getElementById("searchNAV").value.toLowerCase()

    let pages={
        "bitcoin":"aboutCurrency/bitcoin/bitcoin.html",
        "ethereum":"aboutCurrency/ethereum/ethereum.html",
        "binance":"aboutCurrency/binance/binance.html",
        "ripple":"aboutCurrency/ripple/ripple.html",
        "cardano":"aboutCurrency/cardano/cardano.html",
        "stellar":"aboutCurrency/stellar/stellar.html",
        "litecoin":"aboutCurrency/litecoin/litecoin.html",
        "neo":"aboutCurrency/neo/neo.html",
        "polkadot":"aboutCurrency/polka/polka.html",
        "tron":"aboutCurrency/tron/tron.html",
        "chainlink":"aboutCurrency/link/link.html",
        "btc":"aboutCurrency/bitcoin/bitcoin.html",
        "eth":"aboutCurrency/ethereum/ethereum.html",
        "bnb":"aboutCurrency/binance/binance.html",
        "xrp":"aboutCurrency/ripple/ripple.html",
        "ada":"aboutCurrency/cardano/cardano.html",
        "xlm":"aboutCurrency/stellar/stellar.html",
        "ltc":"aboutCurrency/litecoin/litecoin.html",
        "neo":"aboutCurrency/neo/neo.html",
        "dot":"aboutCurrency/polka/polka.html",
        "trx":"aboutCurrency/tron/tron.html",
        "link":"aboutCurrency/link/link.html"
    }

    if(pages[srchText]){
        window.open(pages[srchText],"_blank")
    }
    else{
        alert("The crytpo currency entered is not in the data base, Sorry")
    }
}

srchBtn.addEventListener("click",()=> search()) 
srchBtn.addEventListener("keydown",(evt)=>{  // enter search not working, fix later
    if(evt.key==="Enter"){
        search()
    }
})






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



let currencyCode=["BTC","ETH","XRP","ADA","XLM","LTC","NEO","DOT","TRX","LINK"]



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
        try{
            let baseURL=`https://api.coingecko.com/api/v3/simple/price?ids=${from.value.toLowerCase()}&vs_currencies=${to.value.toLowerCase()}`

            let response= await fetch(new Request(baseURL),{
                method:"GET",
                headers:new Headers({
                    "accept":"application/json",
                    "x-cg-demo-api-key":"CG-89eAtZqtbTUwJ9wpYh9zmNMy"
                })
            })

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            
            let data= await response.json()

            let rate=data[from.value.toLowerCase()][to.value.toLowerCase()]
            let total=rate*amtValue

            console.log(total.toFixed(2))

            document.getElementById("finalAns").textContent=total.toFixed(2)
        }
        catch(error){
            console.log(`error=${error}`)
        }
    }
    else{
        let ans=await fetchPrice(from.value,to.value)
        let finalAns=ans*amtValue
        document.getElementById("finalAns").textContent=finalAns.toFixed(2)
    }
})




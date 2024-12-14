async function fetchData(){
    try{
        let response= await fetch(new Request("https://api.livecoinwatch.com/coins/single"),{
            method:"POST",
            headers:({
                "content-type":"application/json",
                "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
            }),
            body:JSON.stringify({
                currency:"USD",
                code:"DOT",
                offset:0,
                limit:1,
                meta:true
            })
        })

        let data= await response.json()

        document.getElementById("price").textContent=`$${data.rate}`

        document.getElementById("price-inverted").textContent=1/data.rate

        document.getElementById("volume").textContent=data.volume

        document.getElementById("cap").textContent=data.cap

        document.getElementById("number").textContent=data.circulatingSupply

        document.getElementById("max").textContent=`$${data.allTimeHighUSD}`

        document.getElementById("rank").textContent=`#${data.rank}`

        document.getElementById("age").textContent=data.age

        document.getElementById("liq").textContent=data.liquidity

        let times=["hour","day","week","month","quarter","year"]

        for(let now of times){
            let abhi=document.getElementById(now)
            let change=data.delta[now]

            if(change<1){
                abhi.style.color='red'
            }
            else if(change>=1){
                abhi.style.color='green'
            }
            abhi.textContent=change
        }


    }
    catch(error){
        console.log(error)

        document.getElementById("price").textContent="Error"

        document.getElementById("price-inverted").textContent="Error"

        document.getElementById("volume").textContent="Error"

        document.getElementById("cap").textContent="Error"

        document.getElementById("hour").textContent="Error"

        document.getElementById("day").textContent="Error"

        document.getElementById("week").textContent="Error"

        document.getElementById("month").textContent="Error"

        document.getElementById("number").textContent="Error"

        document.getElementById("max").textContent="Error"

        document.getElementById("rank").textContent="Error"

        document.getElementById("age").textContent="Error"

        document.getElementById("quarter").textContent="Error"

        document.getElementById("year").textContent="Error"
    }
}

fetchData()
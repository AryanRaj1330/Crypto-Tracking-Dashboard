async function fetchData(){
    try{
        let response =await fetch(new Request("https://api.livecoinwatch.com/coins/single"),{
            method:"POST",
            headers:new Headers({
                "content-type":"application/json",
                "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
            }),
            body:JSON.stringify({
                currency:"ETH",
                code:"BTC",
                offest:0,
                limit:1,
                meta:false
            })
        })

        let data=await response.json()

        console.log(data.rate)
    }

    catch(error){
        console.log(`error-${error}`)
    }
}

fetchData()
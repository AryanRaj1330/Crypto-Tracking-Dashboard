async function fetchData(){
    try{
        let response= await fetch(new Request("https://api.livecoinwatch.com/coins/single"),{
            method:"POST",
            headers:({
                "content-type":"application/json",
                "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
            }),
            body:JSON.stringify({
                currency:"INR",
                code:"USD",
                offset:0,
                limit:1,
                meta:true
            })
        })

        let data= await response.json()

        console.log(data.rate)
    }
    catch(error){
        console.log(`error=${error}`)
    }
}

fetchData()
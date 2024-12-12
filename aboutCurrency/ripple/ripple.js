async function fetchData(){
    try{
        let response= await fetch(("https://api.livecoinwatch.com/coins/single"),{
            method:"POST",
            headers:({
                "content-type":"application/json",
                "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
            }),
            body:JSON.stringify({
                currency:"USD",
                code:"XRP",
                sort:"rank",
                order:"ascending",
                offset:0,
                limit:1,
                meta:false
            })
        })

        let data= await response.json()

        document.getElementById("price").textContent=data.rate

        document.getElementById("price-inverted").textContent=1/data.rate

        document.getElementById("volume").textContent=data.volume

        document.getElementById("cap").textContent=data.cap

        let hrs=document.getElementById("hrs")
        let hrsChange=data.delta.hour

        if(hrsChange<1){
            hrs.style.color='red'
        }
        else if(hrsChange>=1){
            hrs.style.color='green'
        }

        document.getElementById("hrs").textContent=data.delta.hour

        let day=document.getElementById("day")
        let dayChange=data.delta.hour

        if(dayChange<1){
            day.style.color='red'
        }
        else if(hrsChange>=1){
            day.style.color='green'
        }

        document.getElementById("day").textContent=data.delta.day

        let week=document.getElementById("week")
        let weekChange=data.delta.hour

        if(weekChange<1){
            week.style.color='red'
        }
        else if(weekChange>=1){
            week.style.color='green'
        }

        document.getElementById("week").textContent=data.delta.week

        let month=document.getElementById("month")
        let monthChange=data.delta.hour

        if(monthChange<1){
            month.style.color='red'
        }
        else if(monthChange>=1){
            month.style.color='green'
        }

        document.getElementById("month").textContent=data.delta.month
    }
    catch(error){
        console.log(error)

        document.getElementById("price").textContent="Error"

        document.getElementById("price-inverted").textContent="Error"

        document.getElementById("volume").textContent="Error"

        document.getElementById("cap").textContent="Error"

        document.getElementById("hrs").textContent="Error"

        document.getElementById("day").textContent="Error"

        document.getElementById("week").textContent="Error"

        document.elementFromPoint("month").textContent="Error"
    }
}

fetchData()
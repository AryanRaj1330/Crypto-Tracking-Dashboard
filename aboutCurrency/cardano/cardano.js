function fetchTimeStamp(){
    let dates=[]

    for(let i=0;i<=7;i++){
        let currentDate= new Date()
        currentDate.setDate(currentDate.getDate()-i)
        currentDate.setHours(0,0,0,0)

        dates.push(currentDate.getTime())
    }

    return dates
}

const weekDates= fetchTimeStamp();

let priceArray=[]

async function fetchHistory(){
    let timestamp
    let price=[]
    for(let i=0;i<8;i++){

        timestamp=weekDates[i];

        try{
            const response= await fetch(new Request("https://api.livecoinwatch.com/coins/single/history"),{
                method:"POST",
                headers: new Headers({
                    "content-type":"application/json",
                    "x-api-key":"cb9a09fe-f9f3-40b7-9c38-4883cf04ecf3"
                }),
                body:JSON.stringify({
                    currency:"USD",
                    code:"ADA",
                    start:timestamp,
                    end:timestamp+86400000,
                    meta:true
                })
            })
            const data= await response.json()
            price.push(data.history[0].rate)
        }
        catch(error){
            console.log(`error= ${error}`)
        }
    } 
    priceArray=price.reverse()
    initializeChart()
}

function initializeChart(){
    const canvas= document.getElementById("myCanvas")
        console.log(canvas)
    
        const chart = new Chart(canvas, {
            type: "bar",
            data: {
                labels: ["7 Days ago","6 Days ago","5 Days ago","4 Days ago","3 Days ago","2 Days ago","Yesterday","Today"],
                datasets: [{
                    label:"Price",
                    data:priceArray,
                    backgroundColor:[
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)"
                    ],
                    borderColor:[
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)",
                        "rgb(75, 192, 192)"
                    ],
                    borderWidth:2
                }]
            },
            options:{
                responsive:true,
                maintainAspectRatio:false,
                scales:{
                    x:{
                        grid:{
                            color:"white"
                        },
                        ticks:{
                            color:"yellow",
                            font:{
                                size:14,
                                family:"Verdana"
                            }
                        }
                    },
                    y:{
                        grid:{
                            color:"white"
                        },
                        ticks:{
                            color:"lightblue",
                            font:{
                                size:14,
                                family:"Verdana"
                            }
                        },
                        beginAtZero:true
                    }
                },
                plugins:{
                    legend:{
                        display:true,
                        labels:{
                            font:{
                                size:16, 
                                family:"Arial", 
                            },
                            color:"white"
                        }
                    },
                    tooltip: {
                        backgroundColor:"rgba(0,0,0,0.8)",
                        titleFont:{
                            size:14,
                            family:'Verdana'
                        },
                        bodyFont:{
                            size:12
                        },
                        cornerRadius:4
                    }
                }
            }
        });

        chart.resize()
}

document.addEventListener("DOMContentLoaded",fetchHistory())

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
                code:"ADA",
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
                abhi.style.color="red"
            }
            else if(change>=1){
                abhi.style.color="green"
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
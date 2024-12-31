let logBtn=document.getElementById("login")

const MMSDK= new MetaMaskSDK.MetaMaskSDK({
    dappMetadata:{
        name:"CryptoSpy Dapp",
    },
    infuraAPIKey:"1a9bfff02ceb447e88d9a54a673b2392",
})

console.log("MetaMask SDK initialized")

function toggle(){
    if(!window.ethereum){
        logBtn.innerHTML="MetaMask not installed"
        logBtn.style.backgroundColor="red"
        logBtn.classList.add("hover")
        document.getElementById("not-message").innerText="Please install MetaMask to continue"
        console.log("MetaMask not installed")
    }

    else{
        logBtn.addEventListener("click",()=>{
            loginMetaMask()
        })
    }
}

async function loginMetaMask(){
    try{
    const account= await window.ethereum.request({method:"eth_requestAccounts"})
    console.log("success")
    window.location.href="../index.html"
    }
    catch(error){
        console.log(`error: ${error}`)
    }
}

window.addEventListener("DOMContentLoaded",()=>{
    logBtn.addEventListener("click",()=>{
        toggle()
    })
})
let logBtn=document.getElementById("login-button")

if(!window.ethereum){
    logBtn.innerHTML="MetaMask not installed"
    logBtn.style.backgroundColor="red"
}
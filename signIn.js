import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail , signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBrZEWbChqoTE4BBOt9bHCJ5wdNR_K4yQw",
  authDomain: "cryptospy-f5387.firebaseapp.com",
  projectId: "cryptospy-f5387",
  storageBucket: "cryptospy-f5387.firebasestorage.app",
  messagingSenderId: "128055046170",
  appId: "1:128055046170:web:10f8e1ba9e4d5ba159a1a3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider= new GoogleAuthProvider()

let btn=document.getElementById("submit-button")

btn.addEventListener("click",(event)=>{
    event.preventDefault()

    let email=document.getElementById("email").value
    let password=document.getElementById("password").value

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    window.location.href="frontPage.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    alert(errorMessage)
  });
})

let login=document.getElementById("google")

const userSignIn= async()=>{
  signInWithPopup(auth,provider)
  .then((result)=>{
    const user=result.user
    alert(`user ${user} logged in`)
    window.location.href="frontPage.html"
  })
  .catch((error)=>{
    console.log(error)
  })
}

login.addEventListener("click",userSignIn)

// reset password

let forgot=document.getElementById("forgot")

forgot.addEventListener("click",()=>{
  let email=document.getElementById("email").value
  sendPasswordResetEmail(auth,email)
  .then(()=>{
    alert("Password reset link sent to your email")
  })
  .catch((error)=>{
    console.log(error)
  })
})

// metaMask authentication

const loginMeta=document.getElementById("metaMask")

loginMeta.addEventListener("click", async ()=>{
  if(typeof window.ethereum!=="undefined"){
    try{
      const accounts= await window.ethereum.request({method:"eth_requestAccounts"})

      window.location.href="frontPage.html"
    }

    catch(error){
      console.log(`error=${error}`)
      alert("Error connecting to Meta Mask")
    }
  }
  else{
    alert("Meta Mask is not installed, Please install Meta Mask to Login with MetaMask")
  }
})

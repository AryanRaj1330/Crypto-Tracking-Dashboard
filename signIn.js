import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const provider= new GoogleAuthProvider()

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

let google=document.getElementById("google")

google.addEventListener("click",()=>{
    document.getElementById("email").removeAttribute("required")
    document.getElementById("password").removeAttribute("required")
    
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log("success")
    console.log(user)
    window.location.href="frontPage.html"
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
  });
})
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
    let repass=document.getElementById("repass").value

    if(password!==repass){
        alert("Passwords do not match")
        return
    }

    createUserWithEmailAndPassword(auth, email, password)
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
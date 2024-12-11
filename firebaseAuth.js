 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCUXKJ4Mj3o5S3J-3R2RuoIj6QarIsb-dQ",
   authDomain: "user-authentication-ccbaf.firebaseapp.com",
   projectId: "user-authentication-ccbaf",
   storageBucket: "user-authentication-ccbaf.firebasestorage.app",
   messagingSenderId: "177346774339",
   appId: "1:177346774339:web:94ad61ef2241312b519bf6",
   measurementId: "G-KV1TX6PNCQ"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
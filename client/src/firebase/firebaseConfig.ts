import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// console.log(process.env)
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain:  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId:  process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
//   appId:  process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId:  process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyBWSfDQgonJnSAGvxV_u_IYT_ogrw5m1-E",
  authDomain: "construction-calculatorr.firebaseapp.com",
  projectId: "construction-calculatorr",
  storageBucket: "construction-calculatorr.firebasestorage.app",
  messagingSenderId: "502587709613",
  appId: "1:502587709613:web:3c6970c335103af6d40e24",
  measurementId: "G-C94DGR5H4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth  = getAuth(app);
const db  = getFirestore(app);

export {auth, db }
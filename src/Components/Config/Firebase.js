// Import the functions you need from firebase.
import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCng_bPMs_3ihGelVeFmepScdbSQemZO-E",
    authDomain: "q-app-d23cf.firebaseapp.com",
    projectId: "q-app-d23cf",
    storageBucket: "q-app-d23cf.appspot.com",
    messagingSenderId: "1013875831023",
    appId: "1:1013875831023:web:0cac3c49e4076226d62b1a"
};

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// ______________________________________________________________________.

// TODO.
// 3- Jab totalToken sold token k equal ho to custom message show karna h.
// 2- company k page me Delete company ka kam karna h.
// 4- company k page me token-buyer ka detail show karna h.
// 5- user k page me token-buyer ka detail show karna h.
// 6- Timing set karna h.
// 7- Input feilds empty karna h.

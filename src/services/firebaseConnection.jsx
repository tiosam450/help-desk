import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCXUDkFNsCT99YYKinH4cic_Xc043Fsx7o",
    authDomain: "sistema-de-chamados-40a3a.firebaseapp.com",
    projectId: "sistema-de-chamados-40a3a",
    storageBucket: "sistema-de-chamados-40a3a.appspot.com",
    messagingSenderId: "799381741772",
    appId: "1:799381741772:web:d5df0714b80bf6adf1a269"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, storage, auth}
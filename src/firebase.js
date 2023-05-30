
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmc4PRNbSorxdsSmnnia359soWNL2Iy_c",
  authDomain: "ecommerce-45b30.firebaseapp.com",
  projectId: "ecommerce-45b30",
  storageBucket: "ecommerce-45b30.appspot.com",
  messagingSenderId: "918379740655",
  appId: "1:918379740655:web:cbc6d8620a7b425ec84a1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

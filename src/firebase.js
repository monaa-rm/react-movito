import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeHEBBmwA7OcuuQ8TWCKLGdyhTEahuX5A",
  authDomain: "netflix-33b1c.firebaseapp.com",
  projectId: "netflix-33b1c",
  storageBucket: "netflix-33b1c.appspot.com",
  messagingSenderId: "935402111379",
  appId: "1:935402111379:web:5819678e0041dcd760e866",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAkmtSTCZ7C8lTDcQrQAnEIdEpV5bXgfOo",
//   authDomain: "group-study-assignment-a7832.firebaseapp.com",
//   projectId: "group-study-assignment-a7832",
//   storageBucket: "group-study-assignment-a7832.appspot.com",
//   messagingSenderId: "402379630983",
//   appId: "1:402379630983:web:45113a0e4496e756c20b223309764888",
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY
//   authDomain: 
//   projectId: 
//   storageBucket:
//   messagingSenderId: 
//   appId:
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Firebase Authentication and get a reference to the service
export { app, auth };


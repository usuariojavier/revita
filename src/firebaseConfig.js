// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCGgaPezHH1pAAVmutD9cukdpyE_nMmH2A", // <-- Tu API Key
  authDomain: "larepercha-b3997.firebaseapp.com", // <-- Tu dominio de autenticación
  projectId: "larepercha-b3997",                 // <-- Tu ID de proyecto
  storageBucket: "larepercha-b3997.appspot.com", // <-- Tu Storage Bucket
  messagingSenderId: "112984393696",             // <-- Tu Messaging Sender ID
  appId: "1:112984393696:web:db963d950b64c828ee4d85", // <-- Tu App ID
  measurementId: "G-T6JBZ2M0PG"        ,          // <-- Tu Measurement ID
    databaseURL: "https://larepercha-b3997-default-rtdb.europe-west1.firebasedatabase.app" ,// <-- ¡AÑADE O ACTUALIZA ESTA LÍNEA!
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);

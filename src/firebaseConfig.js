import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGgaPezHH1pAAVmutD9cukdpyE_nMmH2A",
  authDomain: "larepercha-b3997.firebaseapp.com",
  projectId: "larepercha-b3997",
  databaseURL: "https://larepercha-b3997-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "larepercha-b3997.appspot.com",
  messagingSenderId: "112984393696",
  appId: "1:112984393696:web:db963d950b64c828ee4d85",
  measurementId: "G-T6JBZ2M0PG"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const database = getDatabase(app); // ← esta línea soluciona tu error

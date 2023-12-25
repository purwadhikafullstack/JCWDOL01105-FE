import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAHcctIj2wV8yK3TNRaAiAHcC7VLhdthDE",
  authDomain: "web-app-127ae.firebaseapp.com",
  projectId: "web-app-127ae",
  storageBucket: "web-app-127ae.appspot.com",
  messagingSenderId: "950400622477",
  appId: "1:950400622477:web:0325b283a5edbda94327c4",
  measurementId: "G-XY35BFDW9V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

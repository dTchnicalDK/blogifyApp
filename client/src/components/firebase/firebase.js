import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAstOIhFh0QV_KKxDBERtPV2hz_0z4WPgo",
  authDomain: "blogify-a8cee.firebaseapp.com",
  projectId: "blogify-a8cee",
  storageBucket: "blogify-a8cee.firebasestorage.app",
  messagingSenderId: "248681391956",
  appId: "1:248681391956:web:ce79965068284c1e838ac1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// // Optional: Set custom parameters like forcing account selection
// googleProvider.setCustomParameters({
//   prompt: "select_account",
// });

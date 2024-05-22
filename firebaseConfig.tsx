// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth, initializeAuth } from "firebase/auth";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjEyBYh_ez6XaOP0gwYIlW0q2PbR4BtaY",
  authDomain: "instadaelim-defd4.firebaseapp.com",
  projectId: "instadaelim-defd4",
  storageBucket: "instadaelim-defd4.appspot.com",
  messagingSenderId: "622709005188",
  appId: "1:622709005188:web:7ad8af6ce6c694bc331bd1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Instialize Firebase Authentication
// export const auth = getAuth(app);
//for react-native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
//firestore
//storage
const storage = getStorage(app);
export { auth, storage };

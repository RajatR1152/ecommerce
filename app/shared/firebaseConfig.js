import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGXaf0ojyfT2Z1wH2xv8z8317YEke0B5M",
  authDomain: "next-cart-d54d9.firebaseapp.com",
  projectId: "next-cart-d54d9",
  storageBucket: "next-cart-d54d9.appspot.com",
  messagingSenderId: "395724875952",
  appId: "1:395724875952:web:6085a4f1732b6d04473375",
  measurementId: "G-TVTDFHYWNT"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
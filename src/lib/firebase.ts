import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDSvio11ma7DPrjmW2tU8IsMoRHLrc1Nck",
  authDomain: "portfolio-analytics-5c7e5.firebaseapp.com",
  projectId: "portfolio-analytics-5c7e5",
  storageBucket: "portfolio-analytics-5c7e5.firebasestorage.app",
  messagingSenderId: "258634400957",
  appId: "1:258634400957:web:a27d245f358aec2f5063d4",
  measurementId: "G-SH26MWKGMQ",
  // Gunakan URL Realtime Database Singapore karena database Anda dibuat di lokasi tersebut
  databaseURL: "https://portfolio-analytics-5c7e5-default-rtdb.asia-southeast1.firebasedatabase.app" 
};

// Initialize Firebase (Mendukung Hot-Reload di Astro/Vite)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);

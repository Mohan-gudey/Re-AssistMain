// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider} from "firebase/auth";

// // Define constants for each environment variable
// const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
// const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
// const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
// const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
// const FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
// const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
// const FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

// // Log the environment variables to ensure they are loaded correctly
// console.log('Firebase API Key:', FIREBASE_API_KEY);
// console.log('Firebase Auth Domain:', FIREBASE_AUTH_DOMAIN);
// console.log('Firebase Project ID:', FIREBASE_PROJECT_ID);

// // Firebase config using the constants
// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: FIREBASE_AUTH_DOMAIN,
//   projectId: FIREBASE_PROJECT_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
//   appId: FIREBASE_APP_ID,
//   measurementId: FIREBASE_MEASUREMENT_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Auth and provider
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// // Export both
// export { auth, googleProvider };
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // apiKey: 'AIzaSyA_hr9iKvGf7wtIlCPbGs-FoWgYvTT38nc',
  // authDomain: 'my--drive-24733.firebaseapp.com',
  // projectId: 'my--drive-24733',
  // storageBucket: 'my--drive-24733.appspot.com',
  // messagingSenderId: '955794835090',
  // appId: '1:955794835090:web:c28b6c701fa6720f0e884b',
});
console.log(process.env.REACT_APP_FIREBASE_API_KEY);

export const auth = app.auth();
export default app;
const db = app.firestore();
export const folders = db.collection('folders');
export const files = db.collection('files');
export const currentDate = firebase.firestore.FieldValue.serverTimestamp;
export const formatedDoc = (doc) => ({
  id: doc.id,
  ...doc.data(),
});
export const storage = app.storage();

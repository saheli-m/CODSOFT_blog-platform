import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAmP-WIJBpIXSL8TOl_e1xvtQeAlqlhJXI",
  authDomain: "blog-platform-codsoft.firebaseapp.com",
  projectId: "blog-platform-codsoft",
  storageBucket: "blog-platform-codsoft.appspot.com",
  messagingSenderId: "198990262228",
  appId: "1:198990262228:web:99f8de904aebf4685c7041"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAkq2BKDIMJbqhk6lr_XuwmLPW-m7slJ0M",
    authDomain: "fir-books-e3a4c.firebaseapp.com",
    projectId: "fir-books-e3a4c",
    storageBucket: "fir-books-e3a4c.firebasestorage.app",
    messagingSenderId: "136052801095",
    appId: "1:136052801095:web:cb3db88a208497fb427b62",
    measurementId: "G-GXJQFDZV2M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
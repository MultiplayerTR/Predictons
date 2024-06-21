import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,onAuthStateChanged,signInAnonymously} from "firebase/auth";
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";

const firebase = {
    apiKey: "AIzaSyAjWNYA8jA-GUqt4KkD19eghSrI-pG64Fk",
    authDomain: "predictons-7e43a.firebaseapp.com",
    projectId: "predictons-7e43a",
    storageBucket: "predictons-7e43a.appspot.com",
    messagingSenderId: "702616578741",
    appId: "1:702616578741:web:ad32d74564909a2b41ecfc",
    measurementId: "G-QLWH6V00DJ"
};


const app = initializeApp(firebase);
const analytics = getAnalytics(app);
export const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
        const userPredictionDocRef = doc(collection(db, 'users'));
        await setDoc(userPredictionDocRef, { merge: true });
    }

});


export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);


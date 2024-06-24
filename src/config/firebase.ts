import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,onAuthStateChanged,signInAnonymously} from "firebase/auth";
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";

const firebase = {
    apiKey: "AIzaSyDwd6oCgN3-ycZkz_NsyWGpQ8k32Tc3LSs",
    authDomain: "predictions-caac5.firebaseapp.com",
    projectId: "predictions-caac5",
    storageBucket: "predictions-caac5.appspot.com",
    messagingSenderId: "1092202250048",
    appId: "1:1092202250048:web:7bc4d6e4ef587fe83b44a5"
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


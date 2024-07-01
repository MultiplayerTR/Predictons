import { initializeApp } from "firebase/app";
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

export const euroMatchData = async () =>{
    const url = 'https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures?locale=en_GB&tournament_stage_id=SMaVweFA&tournament_season_id=ABkrguJ9';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ab36d0a27emshd7b27907adcc0a1p1d9038jsn0effadc41868',
            'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
export const copaMatchData = async () =>{
    const url = 'https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures?locale=en_GB&tournament_stage_id=zDzsPsN5&tournament_season_id=GIocbJnP';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ab36d0a27emshd7b27907adcc0a1p1d9038jsn0effadc41868',
            'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
export const matchHistoryEuro = async () =>{
    const url = 'https://flashlive-sports.p.rapidapi.com/v1/tournaments/results?locale=en_GB&tournament_stage_id=EcpQtcVi&tournament_season_id=ABkrguJ9';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ab36d0a27emshd7b27907adcc0a1p1d9038jsn0effadc41868',
            'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
export const matchHistoryCopa = async () =>{
    const url = 'https://flashlive-sports.p.rapidapi.com/v1/tournaments/results?locale=en_GB&tournament_stage_id=zDzsPsN5&tournament_season_id=GIocbJnP';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ab36d0a27emshd7b27907adcc0a1p1d9038jsn0effadc41868',
            'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);


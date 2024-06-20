import React, {useEffect, useState} from 'react';
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";
import {collection, doc, getDocs} from "firebase/firestore";
import {auth, copaMatchesRef, db, euroMatchesRef} from "./config/firebase";

type MatchData = {
    id: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    matchHour: string;
};
type Prediction = {
    id: string;
    predictionScore1: string;
    predictionScore2: string;
};

const PredictionPage = () => {

    const [database,setDatabase] = useState(collection(db,"matchesEuro2024"));
    const [activeScroll, setActiveScroll] = useState([] as any);
    const [euroMatches, setEuroMatches] = useState([] as any);
    const [copaMatches, setCopaMatches] = useState([]as any);
    const [classname1, setClassname1] = useState('categoryItems active');
    const [classname2, setClassname2] = useState('categoryItems');

    //@ts-ignore
    const userId = auth.currentUser?.uid;

    const handleActivateEuro = () => {
        setActiveScroll(euroMatches)
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
    }
    const handleActivateCopa = () => {
        setActiveScroll(copaMatches)
        setClassname1("categoryItems")
        setClassname2("categoryItems active")
    }

    return (

        <div>
            <div style={{
                textAlign: "left",
                marginTop: 16,
                marginLeft: 10,
            }}>
                <h4 style={{}}>Predictions</h4>
                <text className={"subInfo"}>Prizes will be received at the end of the tournament.</text>
            </div>
            <div className={"buttonContainer"} style={{
                marginTop: 10,
                marginLeft:8,
            }}>
                <button onClick={handleActivateEuro} className={classname1}>
                    <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                    Euro 2024
                </button>
                <button onClick={handleActivateCopa} className={classname2}>
                    <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa America
                </button>
            </div>
            {activeScroll !== undefined && <ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 75}
                                                                             itemsList={activeScroll}
                                                                             database={database}></ScrollContainerVerticalForMatchSlots>}
            {activeScroll === undefined && <text className={"subInfo"}>You have no prediction in this category</text>
            }

        </div>
    );
};

export default PredictionPage;
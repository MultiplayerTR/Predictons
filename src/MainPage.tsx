import React, {useEffect, useState} from 'react';
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";
import ScrollContainerHorizontal from "./ScrollContainerHorizontal";
import {db} from "./config/firebase";
import {collection, getDocs} from "firebase/firestore"
import MatchOfTheDay from "./MatchOfTheDay";

type MatchData = {
    id: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    matchHour: string;
};

export const euroMatchData = async () =>{
    const url = 'https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures?locale=en_GB&tournament_stage_id=EcpQtcVi&tournament_season_id=ABkrguJ9';
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

const MainPage:React.FC = () => {

    const matchOfTheDayRef = collection(db,"matchOfTheDay");
    const predictions = collection(db,"predictions");

    const [euroMatches, setEuroMatches] = useState([]);
    const [copaMatches, setCopaMatches] = useState([]as any);
    const [predictionData, setPredictionData] = useState([] as any);
    const [matchOfTheDay, setMatchOfTheDay] = useState([] as any);
    const [matchesLive, setMatchesLive] = useState([] as any);

    const [activeScroll, setActiveScroll] = useState([]);

    const [classname1, setClassname1] = useState('categoryItems active');
    const [classname2, setClassname2] = useState('categoryItems');

    const getPredictions = async () => {
        try {
            const prediction = await getDocs(predictions);
            const simplified = prediction.docs.map((doc) => ({...doc.data(),id:doc.id}));
            setPredictionData(simplified)
        }
        catch (err){
            console.log(err)
        }
    };
    const getMatchOfTheDay = async () => {
        try {
            const matchData = await getDocs(matchOfTheDayRef);
            const simplified = matchData.docs.map((doc) => ({...doc.data(),id:doc.id}))[0] as MatchData;
            setMatchOfTheDay(simplified)
        }
        catch (err){
            console.log(err)
        }
    };

    useEffect(() => {
        euroMatchData().then(data => {
            setEuroMatches(data.DATA[0].EVENTS)
            setMatchesLive(data.DATA[0].EVENTS)
            setActiveScroll(data.DATA[0].EVENTS);
        })

        getMatchOfTheDay();
        getPredictions();

    }, []);

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
        <div className={"mainPageItemContainer"}>
            <div style={{
                width:"358px",
                textAlign:"left"
            }}>
                <h4 className={"headerText"}>Hello</h4>
                <h4 className={"subInfo"}>Did you make your predictions today?</h4>
            </div>
            {matchOfTheDay ?(
                <MatchOfTheDay
                    //@ts-ignore
                    team1={matchOfTheDay.team1} team2={matchOfTheDay.team2} score1={matchOfTheDay.score1} score2={matchOfTheDay.score2} matchTime={matchOfTheDay.matchHour}></MatchOfTheDay>
            ):""}
            <div style={{
                display: "flex",
                gap: 240,
            }}>
                <h2 style={{
                    color: "#00FF1A",
                    alignSelf: "start",
                    fontSize: 15
                }}>LIVE MATCHES</h2>
                <button style={{
                    alignSelf: "end",
                    color: "grey",
                    background: "transparent",
                    border: "none",
                    fontWeight: "normal",
                    fontSize: 15
                }}>
                </button>
            </div>
            {matchesLive.length === 0 &&
                <div style={{
                    height:"9vh",
                    display: "flex"
                }}>
                    <text className={"subInfo"} style={{
                        marginTop: 15
                    }}>No live matches now
                    </text>
                </div>}
            {
                matchesLive.length > 0 && <ScrollContainerHorizontal itemsList={matchesLive}></ScrollContainerHorizontal>}
            <div style={{
                display: "flex",
                gap: 60,
            }}>
                <h2 style={{
                    color: "white",
                    alignSelf: "start",
                    fontSize: 15
                }}>TODAY'S MATCHES</h2>
                <h2 style={{
                    alignSelf: "end",
                    color: "white",
                    fontSize: 15
                }}>GROUP STAGE - MD 1</h2>
            </div>
            <div className={"buttonContainer"} style={{
                marginTop: 0
            }}>
                <button onClick={handleActivateEuro} className={classname1}>
                    <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                    Euro 2024
                </button>
                <button onClick={handleActivateCopa} className={classname2}>
                    <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa America
                </button>
            </div>
            <div style={{
                display: "flex",
            }}><ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 35}
                                                     itemsList={activeScroll} predictions={predictionData}></ScrollContainerVerticalForMatchSlots>
            </div>

        </div>
    );
};

export default MainPage;
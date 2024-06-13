import React, {useEffect, useState} from 'react';
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";
import ScrollContainerHorizontal from "./ScrollContainerHorizontal";
import {auth, db} from "./config/firebase";
import {getDocs, collection, doc} from "firebase/firestore"
import MatchOfTheDay from "./MatchOfTheDay";

type MatchData = {
    id: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    matchHour: string;
};

const MainPage:React.FC = () => {

    const euroMatchesRef = collection(db,"matchesEuro2024");
    const copaMatchesRef = collection(db,"matchesCopaAmerica");
    const matchOfTheDayRef = collection(db,"matchOfTheDay");

    const [euroMatches, setEuroMatches] = useState([] as any);
    const [copaMatches, setCopaMatches] = useState([]as any);
    const [matchOfTheDay, setMatchOfTheDay] = useState([] as any);

    const [activeScroll, setActiveScroll] = useState([] as any);
    const [database,setDatabase] = useState(collection(db,"matchesEuro2024"));

    const [classname1, setClassname1] = useState('categoryItems active');
    const [classname2, setClassname2] = useState('categoryItems');

    const fetchMatchData = async (collectionRef: any): Promise<MatchData[]> => {
        const matchData = await getDocs(collectionRef);
        // @ts-ignore
        const matches = matchData.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MatchData));
        return matches;
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
        fetchMatchData(euroMatchesRef).then(data => {
                setEuroMatches(data)
                setActiveScroll(data)
            }
        )

        fetchMatchData(copaMatchesRef).then(data => {
                setCopaMatches(data)
            }
        )
        getMatchOfTheDay();

    }, []);

    const handleActivateEuro = () => {
        setActiveScroll(euroMatches)
        setDatabase(collection(db,"matchesEuro2024"))
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
    }
    const handleActivateCopa = () => {
        setActiveScroll(copaMatches)
        setDatabase(collection(db,"matchesCopaAmerica"))
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
                gap: 205,
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
                }}>see all
                </button>
            </div>
            <ScrollContainerHorizontal></ScrollContainerHorizontal>
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
            }}><ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 33}
                                                     itemsList={activeScroll} database={database}></ScrollContainerVerticalForMatchSlots>
            </div>

        </div>
    );
};

export default MainPage;
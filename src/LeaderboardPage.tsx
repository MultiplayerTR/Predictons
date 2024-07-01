import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import ScrollContainerVerticalForLeaderboard from "./ScrollContainerVerticalForLeaderboard";
import PodiumSlot from "./PodiumSlot";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./config/firebase";
import {matchHistoryCopa, matchHistoryEuro} from "./config/firebase";

const LeaderboardPage = () => {

    const [euroData, setEuroData] = React.useState([] as any);
    const [copaData, setCopaData] = React.useState([] as any);

    const [userData, setUserData] = React.useState([]);

    const [classname1, setClassname1] = React.useState('categoryItems active');
    const [classname2, setClassname2] = React.useState('categoryItems');

    const [activeButton1, setActiveButton1] = React.useState("durationButton active")
    const [activeButton2, setActiveButton2] = React.useState("durationButton")
    const [activeButton3, setActiveButton3] = React.useState("durationButton")



    const combinedMatches = async () => {
        matchHistoryEuro().then(data => {
            setEuroData(data.DATA[0].EVENTS)
            setUserData(data.DATA[0].EVENTS);
        })
        matchHistoryCopa().then(data => {
            setCopaData(data.DATA[0].EVENTS);
        })
    }

    useEffect(() => {
        combinedMatches();
    }, []);

    const handleActivateEuro = () => {
        setUserData(euroData)
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
    }
    const handleActivateCopa = () => {
        setUserData(copaData)
        setClassname1("categoryItems")
        setClassname2("categoryItems active")
    }

    const handleActivateDaily = () => {
        setActiveButton1("durationButton active")
        setActiveButton2("durationButton")
        setActiveButton3("durationButton")
    }
    const handleActivateWeekly = () => {
        setActiveButton1("durationButton")
        setActiveButton2("durationButton active")
        setActiveButton3("durationButton")
    }
    const handleActivateTournament = () => {
        setActiveButton1("durationButton")
        setActiveButton2("durationButton")
        setActiveButton3("durationButton active")
    }


    return (
        <div>
            <h1 className={"bigHeader"}>TOURNAMENT LEADERBOARD</h1>
            <text className={"subInfo"}>Make the correct predictions and compete with other players</text>

            <div>
                <div className={"buttonContainer"}>
                    <button onClick={handleActivateEuro} className={classname1}>
                        <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                        Euro 2024
                    </button>
                    <button onClick={handleActivateCopa} className={classname2}>
                        <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa America
                    </button>
                </div>
                <ScrollContainerVerticalForLeaderboard height={window.innerHeight / 100 * 21}
                                                       items={userData}></ScrollContainerVerticalForLeaderboard>
                <div style={{
                    display: "grid",
                    textAlign: "left",
                    marginTop: 18
                }}>
                    <h4>Reward</h4>
                    <text className={"subInfo"}>Which the winner will receive at the end of the tournament..</text>
                    <text className={"rewardText"}>1 TON</text>
                </div>
                <NavLink to={"/leagues/joined"} className={"joinedLeagueButton"}>
                    <div>
                        <h4 className={"headerText"}>Leagues you joined</h4>
                        <text className={"subInfo"}>Prizes wil be received at the end of tournaments</text>
                    </div>
                    <div style={{
                        display: "grid",
                        width: 120,
                        justifyItems: "end",
                        alignItems: "center",
                    }}>
                        <img src={require("./Images/BackButton.png")} style={{
                            rotate: "180deg"
                        }}/>
                    </div>
                </NavLink>
            </div>


        </div>

    );
};

export default LeaderboardPage;
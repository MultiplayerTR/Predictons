import React from 'react';
import {NavLink} from "react-router-dom";
import ScrollContainerVerticalForLeaderboard from "./ScrollContainerVerticalForLeaderboard";
import PodiumSlot from "./PodiumSlot";

let usersFromDBEuro = [
        ["user1", "6","4","12"],
        ["user2", "6","3","9"],
        ["user3", "6","2","6"],
        ["user4", "6","2","6"],
        ["user5", "6","1","3"]
    ];
let usersFromDBCopa = [
        ["user2", "6","4","12"],
        ["user3", "6","3","9"],
        ["user1", "6","2","6"]
    ];

const LeaderboardPage = () => {

    const [userData, setUserData] = React.useState(usersFromDBEuro);

    const [classname1, setClassname1] = React.useState('categoryItems active');
    const [classname2, setClassname2] = React.useState('categoryItems');

    const [activeButton1, setActiveButton1] = React.useState("durationButton active")
    const [activeButton2, setActiveButton2] = React.useState("durationButton")
    const [activeButton3, setActiveButton3] = React.useState("durationButton")

    const handleActivateEuro = () => {
        setUserData(usersFromDBEuro)
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
    }
    const handleActivateCopa = () => {
        setUserData(usersFromDBCopa)
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
            <h2 style={{
                marginTop:16
            }}>TOURNAMENT LEADERBOARD</h2>
            <text className={"subInfo"}>Make the correct predictions and compete with other players</text>
            <div className={"buttonContainer"}>
                <button onClick={handleActivateEuro} className={classname1}>
                    <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                    Euro 2024
                </button>
                <button onClick={handleActivateCopa} className={classname2}>
                    <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa America
                </button>
            </div>
            <div style={{
                marginTop:16
            }}>
                <button onClick={handleActivateDaily} className={activeButton1}>DAILY</button>
                <button onClick={handleActivateWeekly} className={activeButton2}>WEEKLY</button>
                <button onClick={handleActivateTournament} className={activeButton3}>TOURNAMENT</button>
            </div>
            <div className={"podiumContainer"}>
                <PodiumSlot length={48} placement={"2"} username={usersFromDBEuro[1][0]} points={usersFromDBEuro[1][3]}></PodiumSlot>
                <PodiumSlot length={72} placement={"1"} username={usersFromDBEuro[0][0]} points={usersFromDBEuro[0][3]}></PodiumSlot>
                <PodiumSlot length={48} placement={"3"} username={usersFromDBEuro[2][0]} points={usersFromDBEuro[2][3]}></PodiumSlot>
            </div>
            <ScrollContainerVerticalForLeaderboard height={window.innerHeight / 100 * 21}
                                                   items={userData}></ScrollContainerVerticalForLeaderboard>
            <div style={{
                display: "grid",
                textAlign: "left",
                marginTop: 18
            }}>
                <h4>Reward</h4>
                <text className={"subInfo"}>Which the winner will receive at the end of the tournament..
                </text>
                <text
                    style={{
                        paddingLeft: 8,
                        marginTop: 8,
                        paddingTop:8,
                        height: 28,
                        backgroundColor: '#FFFFFF0D',
                        borderRadius: 4,
                        border: "none",
                        textAlign:"left",
                    }}>1 TON</text>
            </div>
            <NavLink to={"/leagues/joined"} className={"joinedLeagueButton"}>
                <div>
                    <h4>Leagues you joined</h4>
                    <text className={"subInfo"}>Prizes wil be received at the end of tournaments</text>
                </div>
                <div style={{
                    display: "grid",
                    width:120,
                    justifyItems:"end",
                    alignItems:"center",
                }}>
                    <img src={require("./Images/BackButton.png")} style={{
                        rotate:"180deg"
                    }}/>
                </div>
            </NavLink>

        </div>

    );
};

export default LeaderboardPage;
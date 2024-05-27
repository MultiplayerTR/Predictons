import React from 'react';
import {NavLink} from "react-router-dom";
import ScrollContainerVerticalForLeaderboard from "./ScrollContainerVerticalForLeaderboard";

let usersFromDB = [
        ["user1", "6","4","12"],
        ["user2", "6","3","9"],
        ["user3", "6","2","6"]
    ];

const LeaderboardPage = () => {

    const [userData, setUserData] = React.useState(usersFromDB);


    return (
        <div>
            <div style={{
                display: 'grid',
                marginTop: 16,
            }}>
                <div style={{
                    display: "flex",
                    gap: window.innerWidth / 8,
                }}>
                    <NavLink to={"/leagues"} className={"backButton"}></NavLink>
                    <h2>Global League</h2>
                </div>
            </div>
            <div style={{
                display:"flex",
                marginTop:18
            }}>
                <text style={{
                    color:"darkgrey"
                }}>#</text>
                <text style={{
                    marginLeft:4,
                    color:"darkgrey"
                }}>PLAYER</text>
                <text style={{
                    marginLeft:195,
                    width:16,
                    color:"darkgrey"
                }}>P</text>
                <text style={{
                    marginLeft:16,
                    width:16,
                    color:"darkgrey"
                }}>C</text>
                <text style={{
                    marginLeft:16,
                    width:16,
                    color:"darkgrey",
                    justifySelf:"end"
                }}>PTS</text>
            </div>
            <ScrollContainerVerticalForLeaderboard height={window.innerHeight / 100 * 21} items={userData}></ScrollContainerVerticalForLeaderboard>
            <div style={{
                display: "grid",
                textAlign: "left",
                marginTop: 18
            }}>
                <text style={{
                    fontSize: 15,
                    fontWeight: "bold",
                }}>Reward
                </text>
                <text style={{
                    color: "darkgrey",
                    fontSize: 12
                }}>Which the winner will receive at the end of the tournament..
                </text>
                <input
                    type="text"
                    value={"Reward"}
                    style={{
                        paddingLeft: 8,
                        marginTop: 8,
                        height: 36,
                        backgroundColor: '#FFFFFF0D',
                        borderRadius: 4,
                        border: "none",
                    }}></input>
            </div>
        </div>

    );
};

export default LeaderboardPage;
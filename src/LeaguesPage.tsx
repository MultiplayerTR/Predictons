import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import MatchSlot from "./MatchSlot";

const LeaguesPage = () => {

    const [leagues, setLeagues] = React.useState(["Test League"]);
    const [enableLeagues, setEnableLeagues] = React.useState(false);

    useEffect(() => {
        if(leagues.length > 0)
            setEnableLeagues(true)
        else
            setEnableLeagues(false)
    }, [leagues]);


    return (
        <div>
            <div style={{
                marginTop: 16,
                display: 'grid',
            }}>
                <h2>LEAGUES</h2>
                <text style={{
                    color:"darkgrey"
                }}>Create your league, compete with your </text>
                <text style={{
                    color:"darkgrey"
                }}>friends, enjoy the rewards</text>
            </div>
            {!enableLeagues && <div style={{
                display:"grid",
                justifyContent:"center",
                alignItems:"center",
                marginTop: "48px"
            }}>
                <img src={require("./Images/NoLeague.png")} alt={"no league image"} style={{
                    justifySelf:"center",
                    alignSelf:"center"
                }}></img>
                <text style={{
                    color:"darkgrey"
                }}> You haven't joined any league</text>
            </div>}
            {enableLeagues && <div>
                {leagues.map((item, index) => (
                    <div key={index}>
                        <button className={"createLeagueButton"} style={{
                            color:"white"
                        }}>{item}</button>
                    </div>
                ))}
            </div>}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <NavLink to={"/leagues/create"} className={"createLeagueButton active"}>Create a league</NavLink>
            </div>

        </div>
    );
};

export default LeaguesPage;
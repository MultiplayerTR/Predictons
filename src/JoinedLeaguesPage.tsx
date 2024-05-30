import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import ScrollContainerVerticalForLeaderboard from "./ScrollContainerVerticalForLeaderboard";

interface privateLeagues {
    leagueName: string;
    items: string[][];
}

const leaguesData: privateLeagues[] = [
    {
        leagueName: "Test League1",
        items: [["user1", "6","4","12"],
            ["user2", "6","3","9"],
            ["user3", "6","2","6"]]
    },
    {
        leagueName: "Test League2",
        items: [["user3", "6","3","9"],
            ["user4", "6","1","3"],
            ["user5", "6","0","0"]]
    }
];

const JoinedLeaguesPage = () => {

    const [leagues, setLeagues] = React.useState(leaguesData);
    const [enableLeagues, setEnableLeagues] = React.useState(false);
    const [openJoinedLeagues, setOpenJoinedLeague] = React.useState(false);
    const [openLeague, setOpenLeague] = React.useState<privateLeagues>(leagues[0]);

    console.log(leagues);

    useEffect(() => {
        if(leagues.length > 0)
            setEnableLeagues(true)
        else
            setEnableLeagues(false)
    }, [leagues]);

    return (
        <div>
            {!openJoinedLeagues && <div>
                <div style={{
                    marginTop: 16,
                    display: 'grid',
                }}>
                    <div style={{
                        display: "flex",
                    }}>
                        <NavLink to={"/leagues"} className={"backButton"}></NavLink>
                        <h2 style={{
                            width: 310
                        }}>LEAGUES</h2>
                    </div>
                    <text style={{
                        color: "darkgrey"
                    }}>Create your league, compete with your
                    </text>
                    <text style={{
                        color: "darkgrey"
                    }}>friends, enjoy the rewards
                    </text>
                </div>
                {!enableLeagues && <div style={{
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "48px"
                }}>
                    <img src={require("./Images/NoLeague.png")} alt={"no league image"} style={{
                        justifySelf: "center",
                        alignSelf: "center"
                    }}></img>
                    <text style={{
                        color: "darkgrey"
                    }}> You haven't joined any league
                    </text>
                </div>}
                {enableLeagues && <div>
                    {leagues.map((item, index) => (
                        <div key={index}>
                            <button className={"createLeagueButton"} onClick={() => {
                                setOpenLeague(item);
                                setOpenJoinedLeague(true);
                            }
                            } style={{
                                color: "white"
                            }}>{item.leagueName}</button>
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
            </div>}
            {openJoinedLeagues && <div style={{
                marginTop:16,
            }}>
                <div style={{
                    display:"flex"
                }}>
                    <button onClick={() => setOpenJoinedLeague(false)} className={"backButton"}></button>
                    <div>
                        <h3 style={{
                            width: 310
                        }}>{openLeague.leagueName}</h3>
                        <text className={"subInfo"}>Fun way to compete.</text>
                    </div>
                </div>
                <ScrollContainerVerticalForLeaderboard height={window.innerHeight / 100 * 38}
                                                       items={openLeague.items}></ScrollContainerVerticalForLeaderboard>
            </div>}
        </div>
    );
};


export default JoinedLeaguesPage;
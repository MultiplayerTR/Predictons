import React, {ChangeEvent, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

let buttonClassName:string = "createLeagueButton"

const CreateLeague = () => {

    const [isSettingsDone, setIsSettingsDone] = useState(false);
    const [reward, setReward] = useState<string>('');
    const [classname1, setClassname1] = React.useState('categoryItems active');
    const [classname2, setClassname2] = React.useState('categoryItems');
    const [chosenLeague, setChosenLeague] = React.useState('Euro2024');

    const buttons = Array.from({ length: 6 }, (_, index) => ({
        id:index,
        index: index + 1,
    }));

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReward(event.target.value);
    };

    const InvitePanelOpen = () => {
        console.log("Invite Panel Open");
    }

    const CreateLeague = () => {
        console.log("League created");
    }

    const handleActivateEuro = () => {
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
        setChosenLeague("Euro2024")
    }
    const handleActivateCopa = () => {
        setClassname1("categoryItems")
        setClassname2("categoryItems active")
        setChosenLeague("Copa America")
    }

    useEffect(() => {
        if (chosenLeague !== null)
            setIsSettingsDone(true)
        else
            setIsSettingsDone(false);
    }, [chosenLeague]);

    useEffect(() => {
        if (isSettingsDone)
            buttonClassName = "createLeagueButton active";
        else
            buttonClassName = "createLeagueButton";
    }, [isSettingsDone]);

    return (
        <div>
            <div style={{
                display: 'grid',
                marginTop: 16,
            }}>
                <div style={{
                    display:"flex",
                    gap: window.innerWidth/8,
                }}>
                    <NavLink to={"/leagues"} className={"backButton"}></NavLink>
                    <h2>CREATE A LEAGUE</h2></div>
                <text style={{
                    color: "darkgrey"
                }}>Create your league, compete with your
                </text>
                <text style={{
                    color: "darkgrey"
                }}>friends, enjoy the rewards
                </text>
            </div>
            <div style={{
                marginTop: 24,
            }}>
                <div style={{
                    display: "grid",
                    textAlign: "left",
                }}>
                    <text style={{
                        fontSize: 15,
                        fontWeight: "bold",
                    }}>Choose the tournament
                    </text>
                    <text style={{
                        color: "darkgrey",
                        fontSize: 12
                    }}>Euro 2024 or Copa America? Choice is yours
                    </text>
                </div>
                <div className={"buttonContainer"} style={{
                    marginTop: 8
                }}>
                    <button onClick={handleActivateEuro} className={classname1}>
                        <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                        Euro 2024
                    </button>
                    <button onClick={handleActivateCopa} className={classname2}>
                        <img src={require("./Images/CopaAmerica.png")} alt={"Euro2024 icon"}></img>Copa America
                    </button>
                </div>
            </div>
            <div style={{
                display: 'grid',
                marginTop: 16,
            }}>
                <div style={{
                    display: "grid",
                    textAlign: "left",
                }}>
                    <text style={{
                        fontSize: 15,
                        fontWeight: "bold",
                    }}>Invite your friends
                    </text>
                    <text style={{
                        color: "darkgrey",
                        fontSize: 12
                    }}>Invite your friends to compete.
                    </text>
                </div>
            </div>
            <div className="inviteUserContainer">
                {buttons.map((button) => (
                    <button onClick={InvitePanelOpen} className={"inviteUserButton"}>
                    </button>
                ))}
            </div>
            <div style={{
                display: "grid",
                textAlign: "left",
                marginTop:24
            }}>
                <text style={{
                    fontSize: 15,
                    fontWeight: "bold",
                }}>Set a reward
                </text>
                <text style={{
                    color: "darkgrey",
                    fontSize: 12
                }}>Determine the prize the winner of the tournament will receive.
                </text>
                <input
                    type="text"
                    value={reward}
                    onChange={handleInputChange}
                    placeholder="We recommend choosing a fun reward. 🤪"
                    style={{
                        paddingLeft:8,
                        marginTop:8,
                        height:36,
                        backgroundColor: '#FFFFFF0D',
                        borderRadius:4,
                        border:"none",
                }}></input>
                <button className={buttonClassName} disabled={!isSettingsDone} onClick={CreateLeague}>Create a league</button>
            </div>
        </div>
    );
};

export default CreateLeague;
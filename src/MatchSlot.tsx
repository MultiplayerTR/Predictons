import React, {useEffect, useState} from 'react';
import HorizontalNumberSlider from "./HorizontalNumberSlider";

interface teams  {
    team1:string;
    team2:string;
    score1: number;
    score2: number;
}

const MatchSlot: React.FC<teams>= ({team1,team2,score1,score2}) => {

    const [activateScoreSelection, setActivateScoreSelection] = useState<boolean>(false);
    const [scoreForTeam1, setScoreForTeam1] = useState<number>();
    const [scoreForTeam2, setScoreForTeam2] = useState<number>();
    const [height, setHeight] = useState<number>(160);
    const [predictEnable, setPredictEnable] = useState<boolean>(false);
    const [predictLockable , setPredictLockable] = useState<boolean>(false);
    const [matchLive, setMatchLive] = useState<boolean>(false);

    useEffect(() => {
        if (!isNaN(score1) && !isNaN(score2)) {
            setScoreForTeam1(score1)
            setScoreForTeam2(score2)
            setPredictEnable(true)
        }
        else
            setPredictEnable(false)
    }, [score1,score2]);

    useEffect(() => {
        if (scoreForTeam1 !== undefined && scoreForTeam2 !== undefined){
            setPredictLockable(true);
        }
        else
            setPredictLockable(false)
    }, [scoreForTeam1, scoreForTeam2]);


    const handleSelectTeam1 = (number: number) => {
        setScoreForTeam1(number)
    };
    const handleSelectTeam2 = (number: number) => {
        setScoreForTeam2(number)
    };

    const handleScoreSetterActivation = () => {
        setActivateScoreSelection(!activateScoreSelection);
        if (!activateScoreSelection)
            setHeight(226)
        else
        {
            setScoreForTeam1(undefined)
            setScoreForTeam2(undefined)
            setHeight(160)
        }
    }
    
    const handleSavePrediction = () =>{
        console.log("hi")
    }

    return (
        <div className="matchSlot" style={{
            height:`${height}px`
        }}>
            <div>
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    gap: "10px",
                }}>
                    <img src={require("./Images/GER.png")} alt={"German flag"}></img>
                    <text style={{
                        color: "white",
                        fontSize: "18px"
                    }}>{team1}</text>
                </div>
                {activateScoreSelection && <HorizontalNumberSlider min={0} max={10} onSelect={handleSelectTeam1}/>}
            </div>
            <div>
                <h6 style={{
                    color: "grey",
                    fontSize: "12px",
                }}>GROUP STAGE - MD 1
                </h6>
                <h6 style={{
                    color: "dimgrey",
                    fontSize: "12px",
                }}>GROUP A
                </h6>
                {!matchLive && <h6 style={{
                    color: "white",
                    marginTop:16
                }}>V</h6>}
                {matchLive && <h6 style={{
                    color: "white",
                    marginTop:16
                }}>{scoreForTeam1}-{scoreForTeam2}</h6>}
                {!matchLive && <h6 style={{
                    color: "grey",
                    fontSize: "12px",
                }}>19:00
                </h6>}
                {!predictEnable && <div>
                    {!activateScoreSelection && <button onClick={handleScoreSetterActivation} className={"predictNowButton"}>Predict Now
                    </button>}
                </div>}
                {predictEnable && <h4 style={{
                    color: "#FFCC00",
                    gridArea: "second-column-down",
                    marginTop: "20px",
                    fontSize: "12px"
                }
                }>Your prediction: {scoreForTeam1}-{scoreForTeam2}</h4>}
            </div>
            <div>
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    gap: "10px",
                }}>
                    <img src={require("./Images/GER.png")} alt={"German flag"}></img>
                    <text style={{
                        color: "white",
                        fontSize: "18px"
                    }}>{team2}</text>
                </div>
                {activateScoreSelection && <HorizontalNumberSlider min={0} max={10} onSelect={handleSelectTeam2}/>}
            </div>
            {activateScoreSelection && <div style={{
                display: "flex",
                marginBottom: 12,
                justifyContent: "center",
                width:"40vh",
                gap:"10px",
            }}>
                <button onClick={handleScoreSetterActivation} className={"categoryItems"} style={{
                    width: 160,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    color:"white",
                    fontSize:"12px"
                }}>Cancel</button>
                <button onClick={handleSavePrediction} disabled={!predictLockable} className={"categoryItems"} style={{
                    width: 160,
                    backgroundColor: "#FFCC00",
                    color: "#1F2F79",
                    fontSize:"12px"
                }}>{predictLockable && "Predict Now"} {!predictLockable && "Make prediction"}</button>
            </div>}
        </div>
    );
};

export default MatchSlot;
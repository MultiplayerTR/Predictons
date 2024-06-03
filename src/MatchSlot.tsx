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
    const [predictForTeam1, setPredictionForTeam1] = useState<number>();
    const [scoreForTeam2, setScoreForTeam2] = useState<number>();
    const [predictForTeam2, setPredictionForTeam2] = useState<number>();
    const [height, setHeight] = useState<number>(160);
    const [predictEnable, setPredictEnable] = useState<boolean>(false);
    const [predictLockable , setPredictLockable] = useState<boolean>(false);
    const [matchLive, setMatchLive] = useState<boolean>(false);
    let [rePredictAmount, setRePredictAmount] = useState<number>(1);
    const [rePredictable, setRePredictable] = useState<boolean>(true);

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
        if (predictForTeam1 !== undefined && predictForTeam2 !== undefined){
            setPredictLockable(true);
        }
        else
            setPredictLockable(false)
    }, [predictForTeam1, predictForTeam2]);
    
    useEffect(()=>{
        setRePredictable(rePredictAmount > 0);
    }, [rePredictAmount])


    const handleSelectTeam1 = (number: number) => {
        setPredictionForTeam1(number)
    };
    const handleSelectTeam2 = (number: number) => {
        setPredictionForTeam2(number)
    };

    const handleScoreSetterActivation = () => {
        setActivateScoreSelection(!activateScoreSelection);
        if (!activateScoreSelection)
            setHeight(210)
        else
        {
            if (scoreForTeam1 === undefined && scoreForTeam2 === undefined)
            {
                setPredictionForTeam1(undefined)
                setPredictionForTeam2(undefined)
            }

            setHeight(160)
        }
    }
    
    const handleSavePrediction = () =>{
        setPredictEnable(true);
        setScoreForTeam1(predictForTeam1);
        setScoreForTeam2(predictForTeam2);
        setActivateScoreSelection(!activateScoreSelection);
        if (rePredictable){
            rePredictAmount--;
            setRePredictAmount(rePredictAmount)
        }
        setHeight(160)
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
                        fontSize: "18px",
                        marginBottom:10
                    }}>{team1}</text>
                </div>
                {activateScoreSelection && <HorizontalNumberSlider min={0} max={10} onSelect={handleSelectTeam1}/>}
            </div>
            <div style={{
                height: 140,
            }}>
                <h6 className={"subInfo"}>GROUP STAGE MD 1</h6>
                <h6 className={"subInfo"}>GROUP A</h6>
                {!matchLive && <div>
                    {predictEnable && <h6 className={"subInfo"} style={{
                        marginTop:16
                    }}>Your Prediction:</h6>}
                    {!predictEnable && <h6 style={{
                        color: "white",
                        marginTop:16
                    }}> V </h6>}
                    {predictEnable && <h3> {scoreForTeam1 +" - " +scoreForTeam2}</h3>}
                    {!matchLive && <h6 className={"subInfo"}>19:00</h6>}
                </div>}
                {matchLive && <div style={{
                    marginTop:10
                }}>
                    <h3>0-0</h3>
                    {predictEnable && <h6 style={{
                        color: "#00FF1A",
                        fontSize: "12px",
                        marginTop:8
                    }}>00:00</h6>}
                    {predictEnable && <text className={"subInfo"} style={{
                        bottom:0
                    }}
                    >Your Prediction: <text style={{
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}>{scoreForTeam1 + " - " + scoreForTeam2}</text>
                    </text>}
                </div>}
                {!predictEnable && <div>
                    {!activateScoreSelection &&
                        <button onClick={handleScoreSetterActivation} className={"predictNowButton"}>Predict Now
                        </button>}
                </div>}
                {predictEnable && rePredictable && !activateScoreSelection &&
                    <button onClick={handleScoreSetterActivation} className={"predictNowButton"} style={{
                        marginTop:0
                    }}>Re-predict
                    </button>}
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
                        fontSize: "18px",
                        marginBottom:10
                    }}>{team2}</text>
                </div>
                {activateScoreSelection && <HorizontalNumberSlider min={0} max={10} onSelect={handleSelectTeam2}/>}
            </div>
            {activateScoreSelection && <div style={{
                display: "flex",
                marginBottom: 12,
                justifyContent: "center",
                alignItems: "center",
                width:"45.5vh",
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
import React, {useEffect, useState} from 'react';
import HorizontalNumberSlider from "./HorizontalNumberSlider";
import {collection, doc, Timestamp, setDoc, getDocs} from 'firebase/firestore';
import Flag from 'react-world-flags';
import {auth, db} from "./config/firebase";

interface teams  {
    matchId:string;
    team1:string;
    team2:string;
    score1:string;
    score2: string;
    matchTime:number;
    predictions:string[][];
}

const countryCodes: { [key: string]: string } = {
    'Albania': 'ALB',
    'Austria': 'AT',
    'Belgium': 'BE',
    'Croatia': 'HR',
    'Czech Republic': 'CZ',
    'Denmark': 'DK',
    'England': 'GB',
    'France': 'FR',
    'Georgia':'GE',
    'Germany': 'DE',
    'Hungary': 'HU',
    'Italy': 'IT',
    'Netherlands': 'NL',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Romania': 'ROU',
    'Scotland': 'GB-SCT',
    'Serbia': 'SRB',
    'Slovenia':'SI',
    'Slovakia':'SVK',
    'Spain': 'ES',
    'Switzerland': 'CH',
    'Turkey': 'TR',
    'Ukraine': 'UA',
    'Wales': 'GB-WLS',
    'Argentina': 'AR',
    'Bolivia': 'BO',
    'Brazil': 'BR',
    'Canada': 'CAN',
    'Chile': 'CL',
    'Colombia': 'CO',
    'Costa Rica': 'CRC',
    'Ecuador': 'EC',
    'United States': 'EUA',
    'Jamaica': 'JAM',
    'Mexico': 'MEX',
    'Panama': 'COL',
    'Paraguay': 'PY',
    'Peru': 'PE',
    'Uruguay': 'UY',
    'Venezuela': 'VE'
};

const MatchSlot: React.FC<teams>= ({matchId, team1,team2, score1,score2,matchTime,predictions}) => {

    const [scoreForTeam1, setScoreForTeam1] = useState<string>();
    const [predictForTeam1, setPredictionForTeam1] = useState<string>();
    const [scoreForTeam2, setScoreForTeam2] = useState<string>();
    const [predictForTeam2, setPredictionForTeam2] = useState<string>();
    const [liveScore1, setLiveScore1] = useState<string>();
    const [liveScore2, setLiveScore2] = useState<string>();
    const [noPrediction, setNoPrediction] = useState(true);
    const [height, setHeight] = useState<number>(160);
    let [rePredictAmount, setRePredictAmount] = useState<number>(0);
    const [activateScoreSelection, setActivateScoreSelection] = useState<boolean>(false);
    const [rePredictable, setRePredictable] = useState<boolean>(false);
    const [predictEnable, setPredictEnable] = useState<boolean>(false);
    const [predictLockable , setPredictLockable] = useState<boolean>(false);
    const [matchLive, setMatchLive] = useState<boolean>(false);
    const [matchDone, setMatchDone] = useState<boolean>(false);

    //@ts-ignore
    const userId = auth.currentUser?.uid;

    let date = new Date(matchTime * 1000);

    const updateUserPrediction = async (matchId: string, userId:string | undefined,prediction: { prediction1: string|undefined, prediction2: string|undefined }): Promise<void> => {
        const userPredictionDocRef = doc(collection(db, 'predictions'),matchId+userId);
        await setDoc(userPredictionDocRef, prediction, { merge: true });
        console.log("User prediction updated");
    };

    const fetchUserPredictions = () => {
        if (predictions !== undefined && predictions.length >0){
            for (let i = 0; i < predictions.length; i++) {
                //@ts-ignore
                if (predictions[i].id === matchId+userId){
                    //@ts-ignore
                    setScoreForTeam1(predictions[i].prediction1)
                    //@ts-ignore
                    setScoreForTeam2(predictions[i].prediction2)
                    
                    setPredictEnable(true)
                    setNoPrediction(false)
                }
            }
        }
        else{
            setPredictEnable(false)
            setNoPrediction(true)
        }
    };

    useEffect(() => {
        fetchUserPredictions();
        
    }, [fetchUserPredictions]);

    useEffect(() => {
        if (predictForTeam1 !== undefined && predictForTeam2 !== undefined){
            setPredictLockable(true);
            setScoreForTeam1(predictForTeam1)
            setScoreForTeam2(predictForTeam2)
        }
        else
            setPredictLockable(false)
    }, [predictForTeam1, predictForTeam2]);
    
    useEffect(()=>{
        setRePredictable(rePredictAmount > 0);
    }, [rePredictAmount])


    useEffect(() => {
        if(new Date().getTime()>date.getTime()){
            setMatchLive(true)
            setPredictEnable(true)
            setLiveScore1(score1);
            setLiveScore2(score2);
        }
    }, [date, score1, score2]);

    useEffect(() => {
        if (new Date().getTime()/60000-date.getTime()/60000>90){
            setMatchDone(true)
            setScoreForTeam1(predictForTeam1)
            setScoreForTeam2(predictForTeam2)
        }
    },[predictForTeam1, predictForTeam2,matchTime]);

    const handleSelectTeam1 = (number: number) => {
        setPredictionForTeam1(number.toString())
    };
    const handleSelectTeam2 = (number: number) => {
        setPredictionForTeam2(number.toString())
    };

    const handleScoreSetterActivation = () => {
        setActivateScoreSelection(!activateScoreSelection);
        if (!activateScoreSelection)
            setHeight(210)
        else
        {
            setPredictionForTeam1(undefined)
            setPredictionForTeam2(undefined)
            if (scoreForTeam1 !== undefined && scoreForTeam2 !== undefined)
            {
                setScoreForTeam1(undefined);
                setScoreForTeam2(undefined);
            }

            setHeight(160)
        }
    }
    
    const handleSavePrediction = async () =>{
        setPredictEnable(true);
        setScoreForTeam1(predictForTeam1);
        setScoreForTeam2(predictForTeam2);

        if (rePredictable){
            rePredictAmount--;
            setRePredictAmount(rePredictAmount)
        }
        const prediction = {
            prediction1: scoreForTeam1,
            prediction2: scoreForTeam2
        };
        await updateUserPrediction(matchId,userId,prediction);
        setActivateScoreSelection(!activateScoreSelection);
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
                    <Flag code={countryCodes[team1]} className={"circle-flag"}></Flag>
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
                <h6 className={"subInfo"}>GROUP STAGE </h6>
                <h6 className={"subInfo"}>MD 1</h6>
                <h6 className={"subInfo"}>GROUP A</h6>
                {!matchDone && <div>
                    {!matchLive && <div>
                        {predictEnable && <h6 className={"subInfo"} style={{
                            marginTop:16
                        }}>Your Prediction:</h6>}
                        {!predictEnable && <h6 style={{
                            color: "white",
                            marginTop:16
                        }}> V </h6>}
                        {predictEnable && <h3> {scoreForTeam1 +" - " +scoreForTeam2}</h3>}
                        {!matchLive && <h6 className={"subInfo"}>{date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }):""}</h6>}
                    </div>}
                    {matchLive && <div style={{
                        marginTop:10
                    }}>
                        {predictEnable && <h6 style={{
                            color: "#00FF1A",
                            fontSize: "20px",
                            marginTop:8
                        }}>{liveScore1}-{liveScore2}</h6>}
                        {predictEnable && !noPrediction && <text className={"subInfo"} style={{
                            bottom:0
                        }}
                        >Your Prediction: <text style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}>{scoreForTeam1 + " - " + scoreForTeam2}</text>
                        </text>}
                        {predictEnable && noPrediction && <text className={"subInfo"} style={{
                            bottom:0
                        }}
                        >No prediction
                        </text>}
                    </div>}
                </div>}
                {matchDone && <div>
                    <text className={"bigHeader"}>{liveScore1}-{liveScore2}</text>
                </div>}
                {!matchDone && <div>
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
                </div>}
                {matchDone && !noPrediction &&
                    <text className={"subInfo"}>Your prediction: {scoreForTeam1}-{scoreForTeam2}</text>
                }
                {matchDone && noPrediction &&
                    <text className={"subInfo"}>No Prediction</text>
                }
            </div>
            <div>
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    gap: "10px",
                }}>
                    <Flag code={countryCodes[team2]} className={"circle-flag"}></Flag>
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
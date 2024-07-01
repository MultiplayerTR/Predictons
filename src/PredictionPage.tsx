import React, {useEffect, useState} from 'react';
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "./config/firebase";
import {copaMatchData, euroMatchData, matchHistoryCopa, matchHistoryEuro} from "./config/firebase";
import Loading from "./Loading";

const PredictionPage = () => {

    const predictions = collection(db,"predictions");
    const [tabs, setTabs] = React.useState("Predictions");
    const [predictionData, setPredictionData] = useState([] as any);
    const [activeScroll, setActiveScroll] = useState([] as any);
    const [euroMatches, setEuroMatches] = useState([] as any);
    const [historyEuroMatches, setHistoryEuroMatches] = useState([] as any);
    const [copaMatches, setCopaMatches] = useState([]as any);
    const [historyCopaMatches, setHistoryCopaMatches] = useState([]as any);
    const [classname1, setClassname1] = useState('categoryItems active');
    const [classname2, setClassname2] = useState('categoryItems');
    const [activeButton1, setActiveButton1] = React.useState("durationButton active")
    const [activeButton2, setActiveButton2] = React.useState("durationButton")
    const [midnightMatch, setMidnightMatch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleActivatePredictions = () => {
        setActiveButton1("durationButton active")
        setActiveButton2("durationButton")
        setTabs("Predictions")
        handleActivateEuro()
        setActiveScroll(euroMatches)
    }
    const handleActivateHistory = () => {
        setActiveButton1("durationButton")
        setActiveButton2("durationButton active")
        setTabs("History")
        handleActivateEuro()
        setActiveScroll(historyEuroMatches)
    }

    //@ts-ignore
    const userId = auth.currentUser?.uid;

    const filterPredictions = async () =>{
        setIsLoading(true)
        try {
            const prediction = await getDocs(predictions);
            const simplified = prediction.docs.map((doc) => ({...doc.data(),id:doc.id}));
            const filtered = simplified.filter((item) => {
                    //@ts-ignore
                    if(item.id.includes(userId)){
                        return item;
                    }
            });
            setPredictionData(filtered);
        }
        catch (err){
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }

    const getPredictions = async () => {
        try {
            euroMatchData().then(data => {
                const matches = data.DATA[0].EVENTS as string[][];
                const filtered = matches.filter((item) => {
                    for (const predict of predictionData) {
                        //@ts-ignore
                        if(predict.id === item.HOME_NAME + item.AWAY_NAME + userId){
                            return predict.id;
                        }
                    }
                });
                if (filtered.length>0){
                    setEuroMatches(filtered)
                    setActiveScroll(filtered)
                }
            })
            copaMatchData().then((data => {
                const matches = data.DATA[0].EVENTS as string[][];
                const filtered = matches.filter((item) => {
                    for (const predict of predictionData) {
                        //@ts-ignore
                        if(predict.id === item.HOME_NAME + item.AWAY_NAME + userId){
                            return predict.id;
                        }
                    }
                });

                if (filtered.length>0){
                    setCopaMatches(filtered)
                }
            }))
        }
        catch (err){
            console.log(err)
        }
    };

    const getMatchHistory = async () => {
            try {
                matchHistoryEuro().then(data => {
                    const matches = data.DATA[0].EVENTS as string[][];
                    if (matches.length>0){
                        setHistoryEuroMatches(matches)
                    }
                })
                matchHistoryCopa().then(data => {
                    const matches = data.DATA[0].EVENTS as string[][];
                    if (matches.length>0){
                        setHistoryCopaMatches(matches)
                    }
                })
            }
            catch (err){
                console.log(err)
            }
        };

    useEffect(() => {
        filterPredictions();
        getMatchHistory()
        getPredictions()
    }, []);

    const handleActivateEuro = () => {
        if (tabs === "Predictions"){
            setActiveScroll(euroMatches)
        }
        else if (tabs === "History")
            setActiveScroll(historyEuroMatches)
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
        setMidnightMatch(false)
    }
    const handleActivateCopa = () => {
        if (tabs === "Predictions"){
            setActiveScroll(copaMatches)
            setMidnightMatch(true)
        }
        else if (tabs === "History")
            setActiveScroll(historyCopaMatches)
        setClassname1("categoryItems")
        setClassname2("categoryItems active")
    }

    return (
        <div>
            {isLoading ? (<Loading />) : (
                <div>
                    <div style={{
                        textAlign: "left",
                        marginTop: 16,
                        marginLeft: 10,
                    }}>
                        <h4 style={{}}>Predictions</h4>
                        <text className={"subInfo"}>Prizes will be received at the end of the tournament.</text>
                    </div>
                    <div style={{
                        marginTop: 16,
                        gap:20
                    }}>
                        <button onClick={handleActivatePredictions} className={activeButton1}>PREDICTIONS</button>
                        <button onClick={handleActivateHistory} className={activeButton2}>MATCH HISTORY</button>
                    </div>
                    <div className={"buttonContainer"} style={{
                        marginTop: 10,
                        marginLeft: 8,
                    }}>
                        <button onClick={handleActivateEuro} className={classname1}>
                            <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                            Euro 2024
                        </button>
                        <button onClick={handleActivateCopa} className={classname2}>
                            <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa America
                        </button>
                    </div>
                    {activeScroll.length > 0 && <ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 71}
                                                                                      itemsList={activeScroll}
                                                                                      predictions={predictionData} midnightMatch={midnightMatch}></ScrollContainerVerticalForMatchSlots>}
                    {activeScroll.length === 0 && <text className={"subInfo"}>You have no prediction in this category</text>
                    }
                </div>
            )}
        </div>
    );
};

export default PredictionPage;
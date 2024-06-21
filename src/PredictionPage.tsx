import React, {useEffect, useState} from 'react';
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "./config/firebase";
import {euroMatchData} from "./MainPage";

const PredictionPage = () => {

    const predictions = collection(db,"predictions");
    const [predictionData, setPredictionData] = useState([] as any);
    const [filteredItems, setFilteredItems] = useState<string[][]>([]);
    const [activeScroll, setActiveScroll] = useState([] as any);
    const [euroMatches, setEuroMatches] = useState([] as any);
    const [copaMatches, setCopaMatches] = useState([]as any);
    const [classname1, setClassname1] = useState('categoryItems active');
    const [classname2, setClassname2] = useState('categoryItems');

    //@ts-ignore
    const userId = auth.currentUser?.uid;

    const getPredictions = async () => {
        try {
            const prediction = await getDocs(predictions);
            const simplified = prediction.docs.map((doc) => ({...doc.data(),id:doc.id}));
            setPredictionData(simplified)
            euroMatchData().then(data => {
                const matches = data.DATA[0].EVENTS as string[][];
                const filtered = matches.filter((item) => {
                    for (let i = 0; i < matches.length; i++) {
                        for (let j = 0; j < simplified.length; j++) {
                            //@ts-ignore
                            if(simplified[j].id === matches[i].EVENT_ID+userId){
                                return simplified[j].id;
                            }
                        }
                    }
                });

                setFilteredItems(filtered)
                if (filtered.length>0){
                    setEuroMatches(filtered)
                    setActiveScroll(filtered);
                }
            })
        }
        catch (err){
            console.log(err)
        }
    };

    useEffect(() => {
        getPredictions();

    }, []);

    const handleActivateEuro = () => {
        setActiveScroll(euroMatches)
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
    }
    const handleActivateCopa = () => {
        setActiveScroll(copaMatches)
        setClassname1("categoryItems")
        setClassname2("categoryItems active")
    }

    return (

        <div>
            <div style={{
                textAlign: "left",
                marginTop: 16,
                marginLeft: 10,
            }}>
                <h4 style={{}}>Predictions</h4>
                <text className={"subInfo"}>Prizes will be received at the end of the tournament.</text>
            </div>
            <div className={"buttonContainer"} style={{
                marginTop: 10,
                marginLeft:8,
            }}>
                <button onClick={handleActivateEuro} className={classname1}>
                    <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                    Euro 2024
                </button>
                <button onClick={handleActivateCopa} className={classname2}>
                    <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa America
                </button>
            </div>
            {activeScroll.length>0 && <ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 75}
                                                                             itemsList={activeScroll}
                                                                             predictions={predictionData}></ScrollContainerVerticalForMatchSlots>}
            {activeScroll.length === 0 && <text className={"subInfo"}>You have no prediction in this category</text>
            }

        </div>
    );
};

export default PredictionPage;
import React, {useEffect, useRef, useState} from 'react';
import LeaderboardSlot from "./LeaderboardSlot";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./config/firebase";

// @ts-ignore
interface ListProps  {
    height: number;
    items: string[][];
}

const ScrollContainerVerticalForLeaderboard: React.FC<ListProps>= ({height,items}) => {
        const scrollViewRef = useRef<HTMLDivElement>(null);
    const predictions = collection(db,"predictions");
    const users = collection(db,"users");
    const [userData, setUserData] = React.useState([] as any);
    const [predictionData, setPredictionData] = React.useState([] as any);
    const [scores, setUserScores] = React.useState<string[][]>([]);

    const getUserData = async () => {
        try {
            const prediction = await getDocs(users);
            const simplified = prediction.docs.map((doc) => ({...doc.data(),id:doc.id}));
            setUserData(simplified)
        }
        catch (err){
            console.log(err)
        }
    }
    const getPredictionData = async () => {
        try {
            const prediction = await getDocs(predictions);
            const simplified = prediction.docs.map((doc) => ({...doc.data(),id:doc.id}));
            setPredictionData(simplified)
        }
        catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        getUserData();
        getPredictionData();
    }, [getPredictionData, getUserData]);

    useEffect(() => {
        const fetchData = async () => {
            let userD:string[][] = [];
            try {
                for (let i = 0; i < userData.length; i++) {
                    let user: string[] = ['Guest', '0', '0', '0'];
                    for (let j = 0; j < items.length; j++) {
                        for (let k = 0; k < predictionData.length; k++) {
                            // @ts-ignore
                            if (predictionData[k].id === items[j].HOME_NAME + items[j].AWAY_NAME + userData[i].id) {
                                user = [userData[i].nickname, predictionData.length.toString(), '3', '9'];
                            }
                        }
                    }
                    userD.push(user);
                }
            } catch (err) {
                console.log(err);
            }
            setUserScores(userD);
        };

        fetchData();
    }, [items]);

        return (
            <>
                <div style={{
                    display: "flex",
                    marginTop: 18
                }}>
                    <text style={{
                        color: "darkgrey"
                    }}>#
                    </text>
                    <text style={{
                        marginLeft: 4,
                        color: "darkgrey"
                    }}>PLAYER
                    </text>
                    <text style={{
                        marginLeft: 195,
                        width: 16,
                        color: "darkgrey"
                    }}>P
                    </text>
                    <text style={{
                        marginLeft: 16,
                        width: 16,
                        color: "darkgrey"
                    }}>C
                    </text>
                    <text style={{
                        marginLeft: 16,
                        width: 16,
                        color: "darkgrey",
                        justifySelf: "end"
                    }}>PTS
                    </text>
                </div>
                <div
                    className="vertical-scroll-leaderboard"
                    ref={scrollViewRef}
                    style={{userSelect: 'none', height: height, overflowY: 'auto'}}
                >
                    <div>
                        {scores.map((item, index) => (
                            <div key={index}>
                                <LeaderboardSlot placement={(index + 1).toString()} username={item[0]}
                                                 predictAmount={item[1]} correctPredictAmount={item[2]}
                                                 totalPoints={item[3]}></LeaderboardSlot>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
};

export default ScrollContainerVerticalForLeaderboard;
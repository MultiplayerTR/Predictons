import React, {useEffect, useState} from 'react';
import MembershipSlot from "./MembershipSlot";
import MatchSlot from "./MatchSlot";
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";
import {collection, doc, getDocs} from "firebase/firestore";
import {auth, db, telegramUserId} from "./config/firebase";
import {NavLink} from "react-router-dom";

let nick = "Guest";
let walletId = "";

type MatchData = {
    id: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    matchHour: string;
};
type Prediction = {
    id: string;
    predictionScore1: string;
    predictionScore2: string;
};

const ProfilePage = () => {

    const [isNameEditorOpen, setNameEditorOpen] = useState(false);
    const [name, setName] = useState<string>(nick);
    const [isCopied, setIsCopied] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const euroMatchesRef = collection(db,"matchesEuro2024");
    const copaMatchesRef = collection(db,"matchesCopaAmerica");
    const [database,setDatabase] = useState(collection(db,"matchesEuro2024"));
    const [activeScroll, setActiveScroll] = useState([] as any);
    const [euroMatches, setEuroMatches] = useState([] as any);
    const [copaMatches, setCopaMatches] = useState([]as any);
    const [classname1, setClassname1] = useState('categoryItems active');
    const [classname2, setClassname2] = useState('categoryItems');

    //@ts-ignore
    const userId = auth.currentUser.uid;

    if (telegramUserId !== "userID")
        nick = telegramUserId;

    console.log(telegramUserId)

    const handleActivateEuro = () => {
        setActiveScroll(euroMatches)
        setDatabase(collection(db,"matchesEuro2024"))
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
    }
    const handleActivateCopa = () => {
        setActiveScroll(copaMatches)
        console.log(copaMatches)
        setDatabase(collection(db,"matchesCopaAmerica"))
        setClassname1("categoryItems")
        setClassname2("categoryItems active")
    }

    const fetchMatchData = async (collectionRef: any,userId:string) => {
        const matchData = await getDocs(collectionRef);
        // @ts-ignore
        const matches = matchData.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MatchData));
        const matchesWithUserPredictions: MatchData[] = [];
        for (let i = 0; i < matches.length; i++) {
            const predictionData = await getDocs(collection(doc(collectionRef, matches[i].id), "predictions"));
            const predictions: Prediction[] = predictionData.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Prediction);
            if (predictions.length >0){
                for (let j = 0; j < predictions.length; j++) {
                    if (predictions[i].id === matches[i].id+userId){
                        matchesWithUserPredictions.push(matches[i]);
                    }
                }
                return matchesWithUserPredictions;
            }
        }
    };

    useEffect(() => {
        fetchMatchData(euroMatchesRef,userId).then(data => {
                if (data !== null){
                    setEuroMatches(data)
                    setActiveScroll(data)
                }
            }
        )

        fetchMatchData(copaMatchesRef,userId).then(data => {
                if (data !== null)
                    setCopaMatches(data)
            }
        )

    }, []);

    const handleClickCopy = () => {
        navigator.clipboard.writeText(walletId)
            .then(() => {
                console.log('Text successfully copied to clipboard');
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000); // Reset after 2s
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }

    const handleOpenNameEditor = () => {
        setNameEditorOpen(true);
    }

    return (
        <div className={"profileDetails"}>
            <div className="profile-pic-big"></div>
            <div className={"rows-container"}>
                <div className={"profile-detail-style"}>
                    <text style={{
                        paddingTop:4,
                        fontSize: "16px",
                        color: "white",
                        width:170
                    }}>{nick} <text className={"subInfo"}></text></text>
                    <div className={"profile-edit-verified"}>
                        <NavLink to={"/store"} className={"membershipBadge"} style={{
                            textDecoration:"none"
                        }}>FREE</NavLink>
                    </div>
                </div>
                <div className={"wallet-address"}>
                    <text style={{
                        paddingLeft: "10px",
                        textAlign: "left",
                        display: "flex",
                        color: "grey"
                    }}>{walletId} </text>
                    <button onClick={handleClickCopy} className={"wallet-copy"}></button>
                </div>
                <div style={{
                    display: "flex",
                    gap: 4
                }}>
                    <h4 className={"badgeSlots"}>Joined League: 0</h4>
                    <h4 className={"badgeSlots"}>Leagues won: 0</h4>
                </div>
            </div>
            <div style={{
                gridArea: "second-row",
                textAlign: "left",
                marginTop:12
            }}>
                <h4 className={"headerText"}>Your Membership Plan</h4>
                <h4 className={"subInfo"}>You have a free membership</h4>
            </div>
            <div style={{
                gridArea: "third-row"
            }}>
                <MembershipSlot VIP={false}></MembershipSlot>
            </div>
            <div style={{
                gridArea: "forth-row"
            }}>
                <div style={{
                    gridArea: "second-row",
                    textAlign: "left",
                    marginTop: 12
                }}>
                    <h4 className={"headerText"}>Predict History</h4>
                    <h4 className={"subInfo"}>You can view the matches you predicted here.</h4>
                </div>
                <div>
                    <div className={"buttonContainer"} style={{
                        marginTop: 10
                    }}>
                        <button onClick={handleActivateEuro} className={classname1}>
                            <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                            Euro 2024
                        </button>
                        <button onClick={handleActivateCopa} className={classname2}>
                            <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa
                            America
                        </button>
                    </div>
                    <div style={{
                        marginLeft:-8
                    }}>
                        {activeScroll !== undefined &&
                            <ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 75}
                                                                  itemsList={activeScroll}
                                                                  database={database}></ScrollContainerVerticalForMatchSlots>}
                        {activeScroll === undefined &&
                            <text className={"subInfo"}>You have no prediction in this category</text>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
        ;
};

export default ProfilePage;
import React, {ChangeEvent, useEffect, useState} from 'react';
import MembershipSlot from "./MembershipSlot";
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {auth, db} from "./config/firebase";
import {NavLink} from "react-router-dom";
import {matchHistoryCopa, matchHistoryEuro} from "./config/firebase";
import NameEditor from "./NameEditor";

let nick = "Guest";
let walletId = "";

const ProfilePage = () => {

    const predictions = collection(db,"predictions");
    const users = collection(db,"users");
    const [predictionData, setPredictionData] = useState([] as any);
    const [isNameEditorOpen, setNameEditorOpen] = useState(false);
    const [name, setName] = useState<string>(nick);
    const [isCopied, setIsCopied] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [activeScroll, setActiveScroll] = useState([] as any);
    const [euroMatches, setEuroMatches] = useState([] as any);
    const [copaMatches, setCopaMatches] = useState([]as any);
    const [classname1, setClassname1] = useState('categoryItems active');
    const [classname2, setClassname2] = useState('categoryItems');

    //@ts-ignore
    const userId = auth.currentUser?.uid;

    const getMatchHistory = async () => {
        try {
            const prediction = await getDocs(predictions);
            const simplified = prediction.docs.map((doc) => ({...doc.data(),id:doc.id}));
            setPredictionData(simplified)
            matchHistoryEuro().then(data => {
                const matches = data.DATA[0].EVENTS as string[][];
                const filtered = matches.filter((item) => {
                    for (const predict of simplified) {
                        //@ts-ignore
                        if(predict.id === item.HOME_NAME + item.AWAY_NAME + userId){
                            return predict.id;
                        }
                    }
                });
                if (filtered.length>0){
                    setEuroMatches(filtered)
                    setActiveScroll(filtered);
                }
            })
            matchHistoryCopa().then(data => {
                const matches = data.DATA[0].EVENTS as string[][];
                const filtered = matches.filter((item) => {
                    for (const predict of simplified) {
                        //@ts-ignore
                        if(predict.team1 === item.HOME_NAME && predict.team2 === item.AWAY_NAME){
                            return predict.id;
                        }
                    }
                });
                if (filtered.length>0){
                    setCopaMatches(filtered)
                }
            })
        }
        catch (err){
            console.log(err)
        }
    };

    useEffect(() => {
        getMatchHistory()
    }, []);

    const getUserData = async () => {
        try {
            const userData = await getDocs(users);
            return userData.docs.map((doc) => ({...doc.data(), id: doc.id}));
        }
        catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        getUserData().then(data => {
            if (data !== undefined){
                for (let i = 0; i < data.length; i++) {
                    if (userId === data[i].id){
                        //@ts-ignore
                        if (data[i].nickname !== undefined)
                            //@ts-ignore
                            setName(data[i].nickname);
                    }
                }
            }
        })
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
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const updateUserNickname = async (userId:string | undefined,nickname:string): Promise<void> => {
        const userPredictionDocRef = doc(collection(db, 'users'),userId);
        await setDoc(userPredictionDocRef, { nickname: nickname});
    };
    const handleSubmit = async () => {
        if (inputValue !== name){
            setName(inputValue);
            await updateUserNickname(userId,inputValue);
            setInputValue('');
            setNameEditorOpen(false);
        }
    };

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
                    }}>{name} <text className={"subInfo"}></text></text>
                    <div className={"profile-edit-verified"}>
                        <button onClick={handleOpenNameEditor} className={"membershipBadge"} style={{
                            paddingTop:0,
                            height:22,
                            textDecoration: "none"
                        }}>EDIT
                        </button>
                        <NavLink to={"/store"} className={"membershipBadge"} style={{
                            textDecoration: "none"
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
                        {activeScroll.length>0 &&
                            <ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 34}
                                                                  itemsList={activeScroll}
                                                                  predictions={predictionData}></ScrollContainerVerticalForMatchSlots>}
                        {activeScroll.length === 0 &&
                            <text className={"subInfo"}>You have no prediction in this category</text>
                        }
                    </div>

                </div>
            </div>
            <NameEditor isOpen={isNameEditorOpen} close={() => setNameEditorOpen(false)}>
                <p>You can change your name here.</p>
                <p style={{
                    marginTop: 10
                }}>
                    <input type="text"
                           value={inputValue}
                           onChange={handleInputChange}
                           placeholder="Enter new nickname"

                           style={{
                               height: 16,
                               resize: "none",
                               color:"black"
                           }}></input>
                </p>
                <button onClick={handleSubmit}>Change Name</button>
            </NameEditor>
        </div>
    );
};

export default ProfilePage;
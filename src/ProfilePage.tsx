import React, {useState} from 'react';
import MembershipSlot from "./MembershipSlot";
import MatchSlot from "./MatchSlot";
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";

let nick = "Guest";
let walletId = "";

let matchesPredicted = [
    ['Sweden','Belgium',"1","0"],
    ['Argentina','Brazil',"0","2"],
    ['Jamaica','Mexico',"3","1"]
];

const ProfilePage = () => {

    const [isNameEditorOpen, setNameEditorOpen] = useState(false);
    const [name, setName] = useState<string>(nick);
    const [isCopied, setIsCopied] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');

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
                    }}>{nick} <text className={"subInfo"}> 100 TON</text></text>
                    <div className={"profile-edit-verified"}>
                        <div className={"membershipBadge"}>FREE</div>
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
                    <h4 className={"badgeSlots"}>Joined League: 4</h4>
                    <h4 className={"badgeSlots"}>Leagues won: 2</h4>
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
                    marginTop:12
                }}>
                    <h4 className={"headerText"}>Predict History</h4>
                    <h4 className={"subInfo"}>You can view the matches you predicted here.</h4>
                    <div style={{
                        marginLeft:"-8px"
                    }}>
                        <ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 42} itemsList={matchesPredicted}></ScrollContainerVerticalForMatchSlots>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
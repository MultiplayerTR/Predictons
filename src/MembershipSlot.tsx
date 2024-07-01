import React, {useEffect} from 'react';

interface vipStatus{
    VIP:boolean
}

const MembershipSlot:React.FC<vipStatus> = ({VIP}) => {

    const [vip, setVip] = React.useState<boolean>(false);

    useEffect(() => {
        setVip(VIP)
    }, []);

    return (
        <div style={{
            marginLeft:"15px",
            marginRight:"15px",
            marginTop:8
        }}>
            {!vip &&
                <div>
                    <h4 style={{
                        background: "#FFFFFF1A",
                        paddingTop: 8,
                        height: 28,
                        borderRadius: 4,
                    }}>Free Membership</h4>
                    <div className={"membershipSlotItem"}>
                        <div style={{
                            textAlign: "center",
                            placeItems: "center"
                        }}>
                            <h4 className={"headerText2"}>Daily Leaderboard</h4>
                        </div>
                        <div>
                            <h4 className={"slotTextLeft"}>In-Game Features/Boosts</h4>
                            <h4 className={"slotTextLeft"}>Prediction Swap Key</h4>
                        </div>
                    </div>
                    <div className={"membershipSlotItem"}>
                        <div style={{
                            textAlign: "center",
                            placeItems: "center"
                        }}>
                            <h4 className={"headerText2"}>Weekly Leaderboard</h4>
                        </div>
                        <div>
                            <h4 className={"slotTextLeft"}>VIP sub ticket</h4>
                        </div>
                    </div>
                    <div className={"membershipSlotItem"}>
                        <div style={{
                            textAlign: "center",
                            placeItems: "center"
                        }}>
                            <h4 className={"headerText2"}>Tournament Leaderboard</h4>
                        </div>
                        <div>
                            <h4 className={"slotTextLeft"}>TON Coin</h4>
                            <h4 className={"slotTextLeft"}>Small Prize</h4>
                        </div>
                    </div>
                </div>
            }
            {vip &&
                <div>
                    <h4 style={{
                        background: "white",
                        color: "#1F2F79",
                        paddingTop: 8,
                        height: 28,
                        borderRadius: 4
                    }}>VIP Membership</h4>
                    <div className={"membershipSlotItem vip"}>
                        <div style={{
                            textAlign: "center",
                            placeItems: "center"
                        }}>
                            <h4 className={"headerText2"}>Daily Leaderboard</h4>
                        </div>
                        <div>
                            <h4 className={"slotTextLeft"}>TON Coin</h4>
                            <h4 className={"slotTextLeft"}>In-Game Features/Boosts</h4>
                        </div>
                    </div>
                    <div className={"membershipSlotItem vip"}>
                        <div style={{
                            textAlign: "center",
                            placeItems: "center"
                        }}>
                            <h4 className={"headerText2"}>Weekly Leaderboard</h4>
                        </div>
                        <div>
                            <h4 className={"slotTextLeft"}>TON Coin</h4>
                            <h4 className={"slotTextLeft"}>VIP sub ticket</h4>
                        </div>
                    </div>
                    <div className={"membershipSlotItem vip"}>
                        <div style={{
                            textAlign: "center",
                            placeItems: "center"
                        }}>
                            <h4 className={"headerText2"}>Tournament Leaderboard</h4>
                        </div>
                        <div>
                            <h4 className={"slotTextLeft"}>TON Coin</h4>
                            <h4 className={"slotTextLeft"}>Big Prize: PS5, XBOX, or xK USDT, etc.</h4>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MembershipSlot;
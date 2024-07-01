import React from 'react';
import MembershipSlot from "./MembershipSlot";

const StorePage = () => {

    const BecomeVIP = () => {
        console.log("Become VIP");
    }

    return (
        <div>
            <div>
                <h3 className={"bigHeader"}>STORE</h3>
                <text className={"subInfo"}>Upgrade your membership for better rewards</text>
            </div>
            <div style={{
                display:"grid",
                textAlign:"left",
                width:"90vw",
                paddingTop:18,
                marginLeft:15
            }}>
                <text className={"headerText"}>Choose the Membership</text>
                <text className={"subInfo"}>Choose Membership Type</text>
            </div>
            <div>
                <div>
                    <MembershipSlot VIP={false}></MembershipSlot>
                </div>
                <div className={"vip-background"}>
                    <MembershipSlot VIP={true}></MembershipSlot>
                    <button className={"createLeagueButton active"} style={{
                        marginLeft:15
                    }}>VIP Membership will be available soon</button>
                </div>

            </div>
        </div>
    );
};

export default StorePage;
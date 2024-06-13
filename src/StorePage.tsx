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
                marginTop:18,
            }}>
                <text className={"headerText"}>Choose the Membership</text>
                <text className={"subInfo"}>Choose Membership Type</text>
            </div>
            <div>
                <MembershipSlot VIP={false}></MembershipSlot>
                <MembershipSlot VIP={true}></MembershipSlot>
                <button className={"createLeagueButton active"}>VIP Membership will be available soon</button>
            </div>
        </div>
    );
};

export default StorePage;
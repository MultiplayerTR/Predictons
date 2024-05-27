import React from 'react';

interface ListProps  {
    username: string;
    predictAmount:string,
    correctPredictAmount:string,
    totalPoints:string
}

const LeaderboardSlot:React.FC<ListProps> = ({username,predictAmount,correctPredictAmount,totalPoints}) => {
    return (
        <div className={"leaderboardSlot"}>
            <text>1</text>
            <img src={require("./Images/PP1.png")} alt={"profile pic"} style={{
                marginLeft: 8,
            }}></img>
            <text style={{
                width: 244,
                textAlign: "start"
            }}>{username}
            </text>
            <text style={{
                width: 16,
            }}>{predictAmount}
            </text>
            <text style={{
                marginLeft: 16,
                width: 16,
                justifySelf: "end"
            }}>{correctPredictAmount}
            </text>
            <text style={{
                marginLeft: 16,
                width: 30,
                textAlign: "end"
            }}>{totalPoints}
            </text>
        </div>
    );
};

export default LeaderboardSlot;
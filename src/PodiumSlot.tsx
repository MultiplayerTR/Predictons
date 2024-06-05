import React from 'react';

interface podiumSlotProps {
    length:number;
    placement:string;
    username:string;
    points:string;
}

const PodiumSlot: React.FC<podiumSlotProps> = ({length,placement,username,points}) => {
    return (
        <div
            style={{
                display: "grid",
            }}>
            <img src={require("./Images/PP1.png")} alt={"PP1 icon"} style={{
                border: "1px solid #FFCC00",
                borderRadius: 8,
                height: length,
                width: length
            }}></img>
            <h5 style={{
                fontSize:15,
                height:20,
                marginTop:2
            }}>{placement}.{username}</h5>
            <text className={"subInfo"}>{points} PTS</text>
        </div>
    );
};

export default PodiumSlot;
import React from 'react';

const LeaderboardPage = () => {
    return (
        <div>
            <text style={{
                fontSize: 15,
                fontWeight: "bold",
            }}>Reward
            </text>
            <text style={{
                color: "darkgrey",
                fontSize: 12
            }}>The prize the winner will receive at the end of the tournament..
            </text>
            <input
                type="text"
                value={"Reward"}
                style={{
                    paddingLeft: 8,
                    marginTop: 8,
                    height: 36,
                    backgroundColor: '#FFFFFF0D',
                    borderRadius: 4,
                    border: "none",
                }}></input>
        </div>
    );
};

export default LeaderboardPage;
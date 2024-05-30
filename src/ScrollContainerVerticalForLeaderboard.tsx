import React, { useRef} from 'react';
import LeaderboardSlot from "./LeaderboardSlot";

// @ts-ignore
interface ListProps  {
    height: number;
    items: string[][];
}

const ScrollContainerVerticalForLeaderboard: React.FC<ListProps>= ({height,items}) => {
        const scrollViewRef = useRef<HTMLDivElement>(null);

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
                        {items.map((item, index) => (
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
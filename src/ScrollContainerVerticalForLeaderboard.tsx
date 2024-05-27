import React, {useEffect, useRef} from 'react';
import MatchSlot from "./MatchSlot";
import LeaderboardSlot from "./LeaderboardSlot";

// @ts-ignore
interface ListProps  {
    height: number;
    items: string[][];
}

const ScrollContainerVerticalForLeaderboard: React.FC<ListProps>= ({height,items}) => {
        const scrollViewRef = useRef<HTMLDivElement>(null);
        console.log(items)

        return (
            <>
                <div
                    className="vertical-scroll-leaderboard"
                    ref={scrollViewRef}
                    style={{userSelect: 'none', height: height, overflowY: 'auto'}}
                >
                    <div>
                        {items.map((item, index) => (
                            <div key={index}>
                                <LeaderboardSlot username={item[0]} predictAmount={item[1]} correctPredictAmount={item[2]} totalPoints={item[3]}></LeaderboardSlot>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
};

export default ScrollContainerVerticalForLeaderboard;
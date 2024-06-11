import React, {useRef, useEffect} from 'react';
import MatchSlot from "./MatchSlot";

// @ts-ignore
interface ListProps  {
    height: number;
    itemsList: string[][];
}

const ScrollContainerVerticalForMatchSlots: React.FC<ListProps>= ({height, itemsList}) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to top when data changes
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTop = 0;
        }
    }, [itemsList]);

    return (
        //takım bayrakları eklenicek
        <>
            <div
                className="vertical-scroll-container"
                ref={scrollViewRef}
                style={{userSelect: 'none', height: height, overflowY: 'auto'}}
            >
                <div>
                    {itemsList.map((item, index) => (
                        <div key={index}>
                            <MatchSlot team1={
                                // @ts-ignore
                                item.team1} team2={item.team2} score1={item.scoreForTeam1} score2={item.scoreForTeam2} matchTime={item.matchHour} prediction1={item.prediction1} prediction2={item.prediction2}></MatchSlot>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ScrollContainerVerticalForMatchSlots;
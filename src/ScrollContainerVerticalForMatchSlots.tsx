import React, {useRef, useEffect, useState} from 'react';
import MatchSlot from "./MatchSlot";

// @ts-ignore
interface ListProps  {
    height: number;
    itemsList: string[][];
    database:any;
}

const ScrollContainerVerticalForMatchSlots: React.FC<ListProps>= ({height, itemsList,database}) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [filteredItems, setFilteredItems] = useState(itemsList);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTop = 0;
        }

        const today = new Date();
        const filtered = itemsList.filter(item => {
            // @ts-ignore
            const date = new Date(item.START_TIME * 1000);
            return date.getDate() === today.getDate();
        });

        setFilteredItems(filtered);

    }, [itemsList]);

    return (
        <>
            <div
                className="vertical-scroll-container"
                ref={scrollViewRef}
                style={{userSelect: 'none', height: height, overflowY: 'auto'}}
            >
                <div>
                    {filteredItems.map((item, index) => (
                        <div key={index}>
                            <MatchSlot
                                // @ts-ignore
                                matchId={item.EVENT_ID} team1={item.HOME_NAME} team2={item.AWAY_NAME} score1={item.HOME_GOAL_VAR} score2={item.AWAY_GOAL_VAR} matchTime={item.START_TIME} category={database}></MatchSlot>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ScrollContainerVerticalForMatchSlots;
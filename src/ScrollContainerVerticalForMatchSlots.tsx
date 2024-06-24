import React, {useRef, useEffect, useState} from 'react';
import MatchSlot from "./MatchSlot";

// @ts-ignore
interface ListProps  {
    height: number;
    itemsList: string[][];
    predictions:string[][];
}

const ScrollContainerVerticalForMatchSlots: React.FC<ListProps>= ({height, itemsList,predictions}) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [filteredItems, setFilteredItems] = useState(itemsList);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTop = 0;
        }


        const today = new Date();
        const filtered = itemsList.filter(item => {
            //@ts-ignore
            if (item.STAGE_TYPE !== "FINISHED"){
                // @ts-ignore
                const date = new Date(item.START_TIME * 1000);
                return date.getDate() === today.getDate();
            }
            else
                return item;
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
                                matchId={item.EVENT_ID} team1={item.HOME_NAME} team2={item.AWAY_NAME} score1={item.HOME_SCORE_CURRENT} score2={item.AWAY_SCORE_CURRENT} matchTime={item.START_TIME} predictions={predictions}></MatchSlot>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ScrollContainerVerticalForMatchSlots;
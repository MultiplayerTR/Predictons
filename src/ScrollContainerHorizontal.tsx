import React, {useEffect, useRef, useState} from "react";
import Flag from "react-world-flags";

interface ListProps  {
    itemsList: string[][];
}

const countryCodes: { [key: string]: string } = {
    'Albania': 'ALB',
    'Austria': 'AT',
    'Belgium': 'BE',
    'Croatia': 'HR',
    'Czech Republic': 'CZ',
    'Denmark': 'DK',
    'England': 'GB',
    'France': 'FR',
    'Georgia':'GE',
    'Germany': 'DE',
    'Hungary': 'HU',
    'Italy': 'IT',
    'Netherlands': 'NL',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Romania': 'ROU',
    'Scotland': 'GB-SCT',
    'Serbia': 'SRB',
    'Slovenia':'SI',
    'Slovakia':'SVK',
    'Spain': 'ES',
    'Switzerland': 'CH',
    'Turkey': 'TR',
    'Ukraine': 'UA',
    'Wales': 'GB-WLS',
    'Argentina': 'AR',
    'Bolivia': 'BO',
    'Brazil': 'BR',
    'Canada': 'CAN',
    'Chile': 'CL',
    'Colombia': 'CO',
    'Costa Rica': 'CRC',
    'Ecuador': 'EC',
    'United States': 'EUA',
    'Jamaica': 'JAM',
    'Mexico': 'MEX',
    'Panama': 'COL',
    'Paraguay': 'PY',
    'Peru': 'PE',
    'Uruguay': 'UY',
    'Venezuela': 'VE'
};

const ScrollContainerHorizontal: React.FC<ListProps>= ({itemsList}) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [filteredItems, setFilteredItems] = useState(itemsList);

    useEffect(() => {

        const filtered = itemsList.filter(item => {
            // @ts-ignore
            return item.STAGE_TYPE === "LIVE";
        });

        setFilteredItems(filtered);

    }, [itemsList]);

    return (
        <div>
            <div
                ref={containerRef}
                className="scroll-container-horizontal"
                style={{ overflow: 'auto', whiteSpace: 'nowrap' }}
            >
                    {filteredItems.length > 0 &&filteredItems.map((
                        //@ts-ignore
                        item, index) => (
                        <div key={index} ref={el => itemRefs.current[index] = el} className={"liveMatchSlot"}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                textDecoration: "none"
                            }}>
                                <div className={"match-overlay"}>
                                    <div className={"match-container"}>
                                        <h2 style={{
                                            fontSize: 12,
                                            color: "white"
                                        }}>{//@ts-ignore
                                            countryCodes[item.HOME_NAME]}</h2>
                                        <Flag code={
                                            //@ts-ignore
                                            countryCodes[item.HOME_NAME]} className={"circle-flag"} style={{
                                                width:36,
                                                height:36
                                        }}></Flag>
                                        <text style={{
                                            backgroundColor:"black",
                                            color:"white",
                                            borderRadius:"5px"
                                        }}>{//@ts-ignore
                                            item.HOME_SCORE_CURRENT}-{item.AWAY_SCORE_CURRENT}</text>
                                        <Flag code={
                                            //@ts-ignore
                                            countryCodes[item.AWAY_NAME]} className={"circle-flag"} style={{
                                            width:36,
                                            height:36,
                                            marginLeft:10
                                        }}></Flag>
                                        <h2 style={{
                                            fontSize: 10,
                                            color: "white"
                                        }}>{//@ts-ignore
                                            countryCodes[item.AWAY_NAME]}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                {filteredItems.length === 0 && <div>
                    <text className={"bigHeader"}>No live matches at the moment!</text>
                </div>
                }

            </div>
        </div>
    );
};

export default ScrollContainerHorizontal;
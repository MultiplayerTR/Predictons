import React from 'react';
import {Timestamp} from "firebase/firestore";
import Flag from "react-world-flags";


interface teams  {
    team1:string;
    team2:string;
    score1:string;
    score2: string;
    matchTime:Timestamp;
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

const MatchOfTheDay: React.FC<teams>= ({team1,team2, score1,score2,matchTime}) => {
    return (
        <div className={"mostPopularMatchContainer"}>
            <div className={"matchSlot mostPopularMatch"}>
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    gap: "10px",
                }}>
                    <Flag code={countryCodes[team1]} className={"circle-flag"} style={{
                        marginTop: "40px"
                    }}></Flag>
                    <text style={{
                        color: "white",
                        fontSize: "18px"
                    }}>{team1}
                    </text>
                </div>
                <div>
                    <h2 style={{
                        color: "black",
                        fontSize: "12px",
                        borderRadius: "5px",
                        backgroundColor: "#FFCC00",
                        marginBottom: "10px",
                        padding: "3px"
                    }}>MOST POPULAR
                    </h2>
                    <h2 className={"subInfo"}>GROUP STAGE</h2>
                    <h2 className={"subInfo"}>MD 1</h2>
                    <h2 className={"subInfo"}>GROUP A</h2>
                    <h6 style={{
                        color: "white",
                        marginTop: 16
                    }}>V</h6>
                    <h2 className={"subInfo"}>{matchTime ? matchTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }):""}</h2>
                </div>
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    gap: "10px",
                }}>
                    <Flag code={countryCodes[team2]} className={"circle-flag"} style={{
                        marginTop: "40px"
                    }}></Flag>
                    <text style={{
                        color: "white",
                        fontSize: "18px"
                    }}>{team2}
                    </text>
                </div>
            </div>
            <div style={{
                gridArea: "second-column",
            }}>
                <div style={{
                    color: "#FFCC00"
                }}>........................................................................
                </div>
                <button className={"predictNowButton"} style={{
                    marginTop: "8px",
                    marginBottom: "12px",
                }}>Predict Now
                </button>
            </div>
        </div>
    );
};

export default MatchOfTheDay;
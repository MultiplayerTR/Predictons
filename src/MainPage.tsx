import React from 'react';
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";
import ScrollContainerHorizontal from "./ScrollContainerHorizontal";

let matchesEuro = [
    ['France','England'],
    ['Sweden','Belgium',"1","0"],
    ['Albania','Denmark'],
    ['Turkey','Portuguese'],
    ['Poland','Ukraine'],
    ['Spain','Croatia']
];

let matchesCopa = [
    ['Argentina','Brazil',"0","2"],
    ['Bolivia','Canada'],
    ['Jamaica','Mexico',"3","1"],
    ['Peru','Uruguay']
];

const MainPage = () => {

    const [activeScroll, setActiveScroll] = React.useState(matchesEuro);
    const [classname1, setClassname1] = React.useState('categoryItems active');
    const [classname2, setClassname2] = React.useState('categoryItems');

    const handleActivateEuro = () => {
        setActiveScroll(matchesEuro)
        setClassname1("categoryItems active")
        setClassname2("categoryItems")
    }
    const handleActivateCopa = () => {
        setActiveScroll(matchesCopa)
        setClassname1("categoryItems")
        setClassname2("categoryItems active")
    }

    return (
        <div className={"mainPageItemContainer"}>
            <div style={{
                width:"90vw",
                textAlign:"left"
            }}>
                <h4 className={"headerText"}>Hello</h4>
                <h4 className={"subInfo"}>Did you make your predictions today?</h4>
            </div>
            <div className={"mostPopularMatchContainer"}>
                <div className={"matchSlot mostPopularMatch"}>
                    <div style={{
                        display: "grid",
                        alignItems: "center",
                        justifyItems: "center",
                        gap: "10px",
                    }}>
                        <img src={require("./Images/GER.png")} alt={"German flag"} style={{
                            paddingTop: "40px"
                        }}></img>
                        <text style={{
                            color: "white",
                            fontSize: "18px"
                        }}>Germany
                        </text>
                    </div>
                    <div>
                        <h2 style={{
                            color: "black",
                            fontSize: "12px",
                            borderRadius: "5px",
                            backgroundColor: "#FFCC00",
                            marginBottom: "10px",
                            padding:"3px"
                        }}>MOST POPULAR
                        </h2>
                        <h2 className={"subInfo"}>GROUP STAGE</h2>
                        <h2 className={"subInfo"}>MD 1</h2>
                        <h2 className={"subInfo"}>GROUP A</h2>
                        <h6 style={{
                            color: "white",
                            marginTop: 16
                        }}>V</h6>
                        <h2 className={"subInfo"}>19:00</h2>
                    </div>
                    <div style={{
                        display: "grid",
                        alignItems: "center",
                        justifyItems: "center",
                        gap: "10px",
                    }}>
                        <img src={require("./Images/SCO.png")} alt={"Scotland flag"} style={{
                            paddingTop: "40px"
                        }}></img>
                        <text style={{
                            color: "white",
                            fontSize: "18px"
                        }}>Scotland
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
            <div style={{
                display: "flex",
                gap: 205,
            }}>
                <h2 style={{
                    color: "#00FF1A",
                    alignSelf: "start",
                    fontSize: 15
                }}>LIVE MATCHES</h2>
                <button style={{
                    alignSelf: "end",
                    color: "grey",
                    background: "transparent",
                    border: "none",
                    fontWeight: "normal",
                    fontSize: 15
                }}>see all
                </button>
            </div>
            <ScrollContainerHorizontal></ScrollContainerHorizontal>
            <div style={{
                display: "flex",
                gap: 60,
            }}>
                <h2 style={{
                    color: "white",
                    alignSelf: "start",
                    fontSize: 15
                }}>TODAY'S MATCHES</h2>
                <h2 style={{
                    alignSelf: "end",
                    color: "white",
                    fontSize: 15
                }}>GROUP STAGE - MD 1</h2>
            </div>
            <div className={"buttonContainer"} style={{
                marginTop: 0
            }}>
                <button onClick={handleActivateEuro} className={classname1}>
                    <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                    Euro 2024
                </button>
                <button onClick={handleActivateCopa} className={classname2}>
                    <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa America
                </button>
            </div>
            <div style={{
                display: "flex",
            }}><ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 33}
                                                     itemsList={activeScroll}></ScrollContainerVerticalForMatchSlots>
            </div>

        </div>
    );
};

export default MainPage;
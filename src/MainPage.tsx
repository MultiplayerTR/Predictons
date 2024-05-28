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

    const handleActivateEuro = () => {
        setActiveScroll(matchesEuro)
    }
    const handleActivateCopa = () => {
        setActiveScroll(matchesCopa)
    }

    return (
        <div className={"mainPageItemContainer"}>
            <div className={"mostPopularMatchContainer"} style={{
                border: "1px solid #FFCC00",
            }}>
                <div className={"mostPopularMatch"}>
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
                            marginBottom: "10px"
                        }}>MOST POPULAR
                        </h2>
                        <h2 style={{
                            color: "grey",
                            fontSize: "12px",
                        }}>GROUP STAGE - MD 1
                        </h2>
                        <h2 style={{
                            color: "dimgrey",
                            fontSize: "12px",
                        }}>GROUP A
                        </h2>
                        <h6 style={{
                            color: "white",
                            marginTop: 16
                        }}>V</h6>
                        <h2 style={{
                            color: "grey",
                            fontSize: "12px",
                        }}>19:00
                        </h2>
                        <div>
                        </div>

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
                    }}>..............................................................................................................
                    </div>
                    <button style={{
                        width: "80px",
                        height: "20px",
                        paddingBottom: "30px",
                        background: "transparent",
                        border: "none",
                        color: "#FFCC00"
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
                    fontSize:15
                }}>LIVE MATCHES</h2>
                <button style={{
                    alignSelf: "end",
                    color: "grey",
                    background: "transparent",
                    border: "none",
                    fontWeight: "bold",
                    fontSize:15
                }}>see all</button>
            </div>
            <ScrollContainerHorizontal></ScrollContainerHorizontal>
            <div className={"buttonContainer"}>
                <button onClick={handleActivateEuro} className={"categoryItems"}>
                    <img src={require("./Images/Euro2024.png")} alt={"Euro2024 icon"}></img>
                    Euro 2024
                </button>
                <button onClick={handleActivateCopa} className={"categoryItems"}>
                    <img src={require("./Images/CopaAmerica.png")} alt={"Copa America icon"}></img>Copa America
                </button>
            </div>
            <div style={{
                display: "flex",
                gap: 80,
            }}>
                <h2 style={{
                    color: "white",
                    alignSelf: "start",
                    fontSize:15
                }}>TODAY'S MATCHES</h2>
                <h2 style={{
                    alignSelf: "end",
                    color: "white",
                    fontSize:15
                }}>GROUP STAGE - MD 1</h2>
            </div>
            <div style={{
                display: "flex",
            }}><ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 39}
                                                     itemsList={activeScroll}></ScrollContainerVerticalForMatchSlots></div>

        </div>
    );
};

export default MainPage;
import React, {useState} from 'react';
import HorizontalNumberSlider from "./HorizontalNumberSlider";

interface teams  {
    team1:string;
    team2:string;
}

const MatchSlot: React.FC<teams>= ({team1,team2}) => {

    const [activateScoreSelection, setActivateScoreSelection] = useState<boolean>(false);
    const [scoreForTeam1, setScoreForTeam1] = useState<number>();
    const [scoreForTeam2, setScoreForTeam2] = useState<number>();
    const [height, setHeight] = useState<number>(160);

    const handleSelectTeam1 = (number: number) => {
        setScoreForTeam1(number)
    };
    const handleSelectTeam2 = (number: number) => {
        setScoreForTeam2(number)
    };

    const handleScoreSetterActivation = () => {
        setActivateScoreSelection(!activateScoreSelection);
        if (!activateScoreSelection)
            setHeight(226)
        else
            setHeight(160)
    }

    return (
        <div className="matchSlot" style={{
            height:`${height}px`
        }}>
            <div>
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    gap: "10px",
                }}>
                    <img src={require("./Images/GER.png")} alt={"German flag"}></img>
                    <text style={{
                        color: "white",
                        fontSize: "18px"
                    }}>{team1}</text>
                </div>
                {activateScoreSelection && <HorizontalNumberSlider min={0} max={10} onSelect={handleSelectTeam1}/>}
            </div>
            <div>
                <h6 style={{
                    color: "grey",
                    fontSize: "12px",
                }}>GROUP STAGE - MD 1
                </h6>
                <h6 style={{
                    color: "dimgrey",
                    fontSize: "12px",
                }}>GROUP A
                </h6>
                <h6 style={{
                    color: "white",
                    marginTop:16
                }}>V</h6>
                <h6 style={{
                    color: "grey",
                    fontSize: "12px",
                }}>19:00
                </h6>
                <div>
                    {!activateScoreSelection && <button onClick={handleScoreSetterActivation} style={{
                        width: "80px",
                        height: "20px",
                        gridArea: "second-column-down",
                        marginTop: "20px",
                        background: "transparent",
                        border: "none",
                        color: "#FFCC00"
                    }}>Predict Now
                    </button>}
                </div>

            </div>
            <div>
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    gap: "10px",
                }}>
                    <img src={require("./Images/GER.png")} alt={"German flag"}></img>
                    <text style={{
                        color: "white",
                        fontSize: "18px"
                    }}>{team2}</text>
                </div>
                {activateScoreSelection && <HorizontalNumberSlider min={0} max={10} onSelect={handleSelectTeam2}/>}
            </div>
            {activateScoreSelection && <div style={{
                display: "flex",
                marginBottom: 12,
                justifyContent: "center",
                width:"40vh",
                gap:"10px",
            }}>
                <button onClick={handleScoreSetterActivation} className={"categoryItems"} style={{
                    width: 160,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    color:"white",
                    fontSize:"12px"
                }}>Cancel</button>
                <button className={"categoryItems"} style={{
                    width: 160,
                    backgroundColor: "#FFCC00",
                    color: "#1F2F79",
                    fontSize:"12px"
                }}>Predict Now</button>
            </div>}
        </div>
    );
};

export default MatchSlot;
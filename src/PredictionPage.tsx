import React from 'react';
import ScrollContainerVerticalForMatchSlots from "./ScrollContainerVerticalForMatchSlots";

let matchesPredicted = [
    ['Sweden','Belgium',"1","0"],
    ['Argentina','Brazil',"0","2"],
    ['Jamaica','Mexico',"3","1"]
]

const PredictionPage = () => {
    return (

        <div>
            <div style={{
                textAlign: "left",
                marginTop:16,
                marginLeft:10,
            }}>
                <h4 style={{}}>Predictions</h4>
                <text style={{
                    fontSize:12,
                    color: "#AAAAAA",
                }}>Prizes will be received at the end of the tournament.</text>
            </div>
            <ScrollContainerVerticalForMatchSlots height={window.innerHeight / 100 * 90}
                                                  itemsList={matchesPredicted}></ScrollContainerVerticalForMatchSlots>
        </div>
    );
};

export default PredictionPage;
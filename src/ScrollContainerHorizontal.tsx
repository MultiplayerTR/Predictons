import React, {useEffect, useRef, useState} from "react";
import {Link, NavLink} from "react-router-dom";

const ScrollContainerHorizontal = () => {
    const items = [
        //itemları imagelere göre adapte edicez
        //itemlar şu an için canlı olup olmadığı anlık kontrol edilmiyor.
        {id:1, title:"liveMatchSlot", url:'http://www.google.com/',text1: "GER",text2:"SCOT", live:""},
        {id:2, title:"liveMatchSlot",url:'http://www.google.com/',text1: "!",text2:"Watch Video Ads", live:"live"},
        {id:3, title:"liveMatchSlot",url:'http://www.google.com/',text1: "Hi!",text2:"Tweet somethings on x", live:"live"},
        {id:4, title:"liveMatchSlot",url:'http://www.google.com/',text1: "Hiiii!",text2:"Fight!", live:""},
    ];
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <div>
            <div
                ref={containerRef}
                className="scroll-container-horizontal"
                style={{ overflow: 'auto', whiteSpace: 'nowrap' }}
            >
                {items.map((item, index) => (
                    <div key={item.id} ref={el => itemRefs.current[index] = el} className={item.title + " " + item.live}
                    >
                        <Link to={item.url} style={{
                            width: '100%',
                            height: '100%',
                            textDecoration: "none"
                        }}>
                            <div className={"match-overlay"}>
                                <div className={"match-container"}>
                                    <h2 style={{
                                        fontSize: 12,
                                        color: "white"
                                    }}>{item.text1}</h2>
                                    <img src={require("./Images/GER.png")} alt={"Euro2024 icon"}
                                         style={{
                                             marginLeft:10,
                                             width: 24,
                                             height: 24
                                         }}></img>
                                    <text style={{
                                        backgroundColor:"black",
                                        color:"white",
                                        borderRadius:"5px"
                                    }}>2-1</text>
                                    <img src={require("./Images/SCO.png")} alt={"Euro2024 icon"} style={{
                                        marginLeft:10,
                                        width: 24,
                                        height: 24
                                    }}></img>
                                    <h2 style={{
                                        fontSize: 10,
                                        color: "white"
                                    }}>{item.text2}</h2>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrollContainerHorizontal;
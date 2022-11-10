import React, { useState } from "react";
import s from './time.module.css';
const Time = (props) => {
    const [hour, setHour] = useState(15);
    const [minute, setMinute] = useState(30);
    const [isHour, setIsHour] = useState(false);
    const [isMinute, setIsMinute] = useState(false);
    const hours = ["08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const minutes = [15, 30, 45, "00"];

    const hoursDiv = hours.map(el => {
        return (
            <div className={s.hourdiv} onClick={()=>choiseHour(el)}>{el}</div>
        )
    })
    const minuteDiv = minutes.map(el => {
        return (
            <div className={s.hourdiv} onClick={()=>choiseMinute(el)}>{el}</div>
        )
    })    
    function choiseHour(h){
        setHour(h);
        setIsHour(false)
    }
    function choiseMinute(m){
        console.log(m)
        setMinute(m);
        setIsMinute(false);
        props.time({h:hour,m:m})
    }

    return (
        <div className={s.time}>
        {!isHour&&!isMinute?
            <div className={s.scoreboard}>
            <div className={s.hour} onClick={() => {setIsHour(true) }}>
                    {hour}
                </div> 

            <div>:</div>
            <div className={s.minute} onClick={() => {setIsMinute(true) }}>{minute}</div>
            </div>
        :isHour?hoursDiv:minuteDiv}
            
            
                
        </div>
    )
};
export default Time;
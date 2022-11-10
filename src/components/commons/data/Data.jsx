import React, { useState } from "react";
import s from './data.module.css';
const Data = (props) => {
    const [year, setYear] = useState(2022);
    const [month, setMonth] = useState("Январь");
    const [day,setDay]=useState(1);
    const [show,setShow]=useState('day');
    let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    let months = {
        "Январь": days.concat([29, 30, 31]),
        "Февраль": days,
        "Март": days.concat([29, 30, 31]),
        "Апрель": days.concat([29, 30]),
        "Май": days.concat([29, 30, 31]),
        "Июнь": days.concat([29, 30]),
        "Июль": days.concat([29, 30, 31]),
        "Август": days.concat([29, 30, 31]),
        "Сентябрь": days.concat([29, 30]),
        "Октябрь": days.concat([29, 30, 31]),
        "Ноябрь": days.concat([29, 30]),
        "Декабрь": days.concat([29, 30, 31]),
    };

    let monthsAlias = {
        "Январь": "Января",
        "Февраль":"Февраля",
        "Март": "Марта",
        "Апрель":"Апреля",
        "Май": "Мая",
        "Июнь": "Июня",
        "Июль": "Июля",
        "Август": "Августа",
        "Сентябрь":"Сентября",
        "Октябрь": "Октября",
        "Ноябрь":"Ноября",
        "Декабрь":"Декабря",
    };
    let years = [2022, 2023,2024,2025];

    let monthDays = months[month].map(el=>{
        return(
            <div className={s.monthday} onClick={()=>choiseDay(el)}>{el}</div>
        )
    })
    let centuryYears = years.map(el=>{
        return(
            <div className={s.centuryyears} onClick={()=>choiseYear(el)}>{el}</div>
        )
    })
    let yearMonths = Object.keys(months).map(el=>{
        return(
            <div className={s.yearmonths} onClick={()=>choiseMonth(el)}>{el}</div>
        )
    })
    function choiseYear(y){
        setYear(y);
        setShow('month')
    }
    function choiseMonth(m){
        setMonth(m);
        setShow('day')
    }
    function choiseDay(d){
        setDay(d);
        
    }

    return (
        <div className={s.data}>
            <div className={s.header}>
                <div className={s.month} onClick={()=>setShow('month')}>{month}</div>
                <div className={s.year} onClick={()=>setShow('yaer')}>{year}</div>

            </div>
            <div className={s.body}>
                {show=='day'?monthDays:''}
                {show=='month'?yearMonths:''}
                {show=='yaer'?centuryYears:''}
            </div>
            <div className={s.result} onClick={()=>props.data({d:day,m:monthsAlias[month],y:year})}>
                {day} {monthsAlias[month]} {year}
            </div>
        </div>
    )
};
export default Data;
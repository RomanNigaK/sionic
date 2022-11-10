import React from "react";
import s from './preloader.module.css'
const Preloader = ({text,...props}) => {
    return (
        <>
            <div className={props.max?s.preloaderBoxMax:s.preloaderBox} >
            <div className={s.box}>
            <img src="../Preloader.gif" alt="Загрузка..." />
                
                <div className={s.textPreloader}>{text}</div>
            </div>
                

            </div>
        </>
    )
};
export default Preloader;
import React from "react";
import s from './error.module.css';

const Error=(props)=>{
    return(
      <div className={s.err}>
            {props.text}
      </div>
    )
};
export default Error;
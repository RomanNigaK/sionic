import React, { useEffect, useState } from "react";
import s from './input.module.css';

const Input = ({ value, beforeImg, afterImg, dataInput,validator,beforeText,placeholder, ...props }) => {
    const [isVisit, setIsVisit] = useState(false);
    const [isError,setIsError]=useState(false);
    const [error,setError]=useState('')

    function onChangeInput(e) {
        setIsVisit(true);
        dataInput({value:e.target.value,isValid:false});
        setIsError(false);
        setError('');
    }

    function validatorsInput(){
        for (let index = 0; index < validator.length; index++) {
            let e = validator[index](value);
            console.log(e)
            if(e.error){
                setError(e.msg);setIsError(e.error);
                dataInput({value:value,isValid:false});
                break;
            }
            dataInput({value:value,isValid:true})
        }
       
    }

    function exitInput(){
        
        validatorsInput();

    }




    return (
        <>
        <div className={isError&&isVisit?s.boxInput+ ' '+s.inputerror:s.boxInput}>
            {beforeImg ? <img src={beforeImg} alt="adres" /> : null}
            {beforeText ? beforeText : null}
            <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChangeInput(e)} onBlur={exitInput} onFocus={()=>setIsVisit(true)}/>
            {afterImg ? <img src={afterImg} alt="adres" /> : null}
            
        </div>
        <div className={s.error}>{isError&&isVisit?error:null}</div>
        
        </>
        
    )
};
export default Input;
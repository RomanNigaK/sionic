import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuntytiViewItemsProducts, setSort } from "../../../redux/appSlice";
import { clearProduct } from "../../../redux/models/Product";

import s from './options.module.css';
const Options = (props) => {
    const [isShow, setIsShow] = useState(false);
   const typeSort = useSelector(state=>state.app.sort)[1];
   console.log(typeSort);
    const dispatch = useDispatch();

    if (!isShow) return (<div onClick={() => setIsShow(true)}>Настройки</div>)
    function choiseSort(e) {

        setIsShow(false);
        dispatch(clearProduct());
        dispatch(setSort(e.target.value));


    }

    
    return (<>

        Настройки 

        <div className={s.options}>

            <div className={s.body}>
                
                <div className={s.header}>
                    <div>Сортировка</div>
                    <div onClick={()=>setIsShow(false)}>&#10006;</div>
                </div>

                <div className={s.field}>Название продукта
                    <div>
                        <select onChange={(e) => choiseSort(e)}>
                            
                            <option value="ASC" disabled={typeSort=="ASC"?true:false} selected={typeSort=="ASC"?true:false}>По возрастанию (А..Я)</option>
                            <option value="DESC" disabled={typeSort=="DESC"?true:false} selected={typeSort=="DESC"?true:false}>По убыванию (Я..А)</option>
                        </select>
                    </div>
                </div>

                <div>

                </div>

            </div>
        </div></>
    )
};
export default Options;
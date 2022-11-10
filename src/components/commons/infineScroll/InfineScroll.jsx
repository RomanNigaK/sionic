import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoadMoreProducts, setRange, setStartRange } from "../../../redux/appSlice";
import Preloadermin from "../Preloadermin";

import s from './style.module.css';
const InfineScroll = ({quantityProductsInORM,...props}) => {
const quantityViewItems = useSelector(state=>state.app.quntytiViewItemsProducts);
const dispatch =useDispatch();

function loadMoreProducts() {
    dispatch(setStartRange([quantityProductsInORM,quantityProductsInORM+quantityViewItems]));
    dispatch(setIsLoadMoreProducts(false));
}



    return (<>
        <div className={s.infinescroll}>
            {props.isLoad?<div className={s.moreproducts} onClick={loadMoreProducts}>
                Показать больше товаров
            </div>:<Preloadermin/>}
            
        </div>
    </>)
};
export default InfineScroll;

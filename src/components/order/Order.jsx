import React from "react";
import { useSelector } from "react-redux";
import { orderItems } from "../../redux/orm/selectors";
import Item from "./Item";
import s from './order.module.css';
const Order = () => {
    const orders = useSelector(state=> orderItems(state));

    let listOrders = orders.map(el=>{
        return(
            <Item data = {el} key={el.id+'order'}/>
        )
    })
    console.log(orders)
    return (<>
        <div className={s.order}>
            <div className={s.header}>История заказов</div>
            <div className={s.body}>
                {orders.length>0?listOrders:<h2>У вас нет ранее сделанных заказов</h2>} 
            </div>
        </div>

    </>)

};
export default Order;
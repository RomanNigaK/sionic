import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { required, validAdres, validNumber } from "../../js/validators";
import { deleteBasket } from "../../redux/models/basket";
import { addOrder } from "../../redux/models/order";
import { basketItems, orderItems, sumBasket } from "../../redux/orm/selectors";
import Data from "../commons/data/Data";
import Time from "../commons/time/Time";
import Input from "../commons/ul/input/Input";
import s from './delivery.module.css';


const Delivery = () => {
    const dispatch = useDispatch();
    const [isShowData, setIsShowData] = useState(false);
    const [isShowTime, setIsShowTime] = useState(false);
    const [data, setdata] = useState('');
    const [time, settime] = useState('');
    const [adres, setAdres] = useState({ value: '', isValid: false });
    const [userName, setUserName] = useState({ value: '', isValid: false });
    const [number, setNumber] = useState({ value: '', isValid: false });
    const [isValidForm, setIsValidForm] = useState(true);
    const basketOrm = useSelector(state => basketItems(state));
    const ordertOrm = useSelector(state => orderItems(state));
    const [orders, setOrders] = useState(ordertOrm.length);
    const [createOrder, setCreateOrder] = useState(false);

    function dataDelivery(obj) {
        setIsShowData(false)
        setdata(obj.d + ' ' + obj.m + ' ' + obj.y);
    }
    function timeDelivery(obj) {
        setIsShowTime(false);
        settime(obj.h + '.' + obj.m);
    }

    function newOrder() {
        console.log(basketOrm)
        if (adres.isValid && userName.isValid && number.isValid && data && time) {
            let data = new Date();
            let d = data.getDate() + '.' + data.getMonth() + '.' + data.getFullYear();
            let arrForDispatch = []
            basketOrm.forEach(element => {
                let objForDispatch = {};
                objForDispatch.product_id = element.id_product;
                objForDispatch.product_variation_id = element.product_variation_id;
                objForDispatch.dataOrder = d;
                objForDispatch.quantity = element.quantity;
                objForDispatch.price = element.price;
                objForDispatch.delivery = adres.value;
                objForDispatch.status = 'новый/оплачен';
                arrForDispatch.push(objForDispatch);
            });
            console.log(arrForDispatch)
            dispatch(addOrder(arrForDispatch));
            dispatch(deleteBasket());
        } else {
            setIsValidForm(false)
        }

    }
    useEffect(() => {
        console.log('11111');
        if (ordertOrm.length > orders) {
            setCreateOrder(true)
        }
    }, [ordertOrm])
    const summa = useSelector(state => sumBasket(state));
    const priceDelivery = 250;
    if (createOrder) {
        return (
            <div className={s.delivery}>
                <div className={s.header}>Доставка</div>
                <div className={s.body}>
                    <div>
                        <h3>Заказ успешно сформирован!</h3>
                        <NavLink to="/orders">Посмотреть детали заказа</NavLink>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className={s.delivery}>
                <div className={s.header}>Доставка</div>
                <div className={s.body}>
                    <div className={s.option}>
                        <h3>Дата и время</h3>
                        <div className={s.datatime}>
                            <div >
                                <div onClick={() => setIsShowData(true)}>
                                    {data ? data : 'Выберите дату'}
                                </div>
                                {isShowData ? <Data data={dataDelivery} /> : ''}
                            </div>
                            <div>
                                <div onClick={() => setIsShowTime(true)}>
                                    {time ? time : 'Выберите Время'}
                                </div>
                                {isShowTime ? <Time time={timeDelivery} /> : ''}
                            </div>
                        </div>
                        <h3>Куда доставить</h3>
                        <Input beforeImg="vector.png"
                            placeholder="Адрес доставки"
                            value={adres.value}
                            dataInput={setAdres}
                            validator={[required, validAdres]} />
                        <h3>Имя</h3>
                        <Input
                            placeholder="Как вас зовут?"
                            value={userName.value}
                            dataInput={setUserName}
                            validator={[required]} />
                        <h3>Телефон</h3>
                        <Input
                            beforeText="+7"
                            value={number.value}
                            dataInput={setNumber}
                            validator={[required, validNumber]}
                            placeholder="012 345 67 89"
                        />
                    </div>
                    <div className={s.aboutorder}>
                        <div className={s.summa}>
                            <div>
                                <div>Стоимость товара:</div>
                                <div>{summa} &#8381;</div>
                            </div>
                            <div>
                                <div>Стоимость доставки:</div>
                                <div>{priceDelivery} &#8381;</div>
                            </div>
                            <br></br>
                            <div>
                                <div>Итого:</div>
                                <div>{summa + priceDelivery} &#8381;</div>
                            </div>
                        </div>
                        {basketOrm.length > 0 ? <div className={s.btnorder} onClick={newOrder}>
                            Сделать заказ
                        </div> : <h2>У вас нет в корзине товара для оформления заказа</h2>}
                        <div className={s.err}>{isValidForm ? '' : 'Данные не корекнты'}</div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Delivery;
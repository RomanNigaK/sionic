import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { apiSionic } from "../../api/api";


import { addBasket, dec, deleteBasket, deleteItemOrm, inc } from "../../redux/models/basket";



import { basketItems, sumBasket } from "../../redux/orm/selectors";
import Preloader from "../commons/Preloader";
import s from './basket.module.css';
const Basket = () => {
    const dispatch = useDispatch();
    const basketOrm = useSelector(state => basketItems(state));
    const [isLoad, setIsLoad] = useState(false);
    const sum = useSelector(state => sumBasket(state));


    function deleteItemBasket(index) {

        dispatch(deleteItemOrm(index));
    }




    useEffect(() => {
        if (basketOrm.length > 0) {
            g();
        } else {
            setIsLoad(true);
        }
        async function g() {
            basketOrm.forEach(async element => {
                let obj = { ...element }
                let product = await apiSionic.getProductId(element.id_product);
                let img = await apiSionic.getImagesProduct(element.id_product).then(images => images[0].image_name);
                let variatinon = await apiSionic.getProductVariationsId(element.product_variation_id);
                Promise.all([product, img, variatinon]).
                    then(values => {

                        obj.image_name = values[1];
                        obj.name = values[0].name;
                        obj.quantity = 1;
                        obj.stock = values[0].stock;
                        obj.price = values[2].price;
                        obj.stock = values[2].stock;
                        obj.id = element.id;

                        dispatch(addBasket(obj))
                        setIsLoad(true)
                    }).
                    catch(err => console.log(err));
            });


        }



    }, []);

    let items = basketOrm.map(el => {
        console.log()

        let options = Object.keys(el.option).map(i => {
            return (
                <><b>{i}</b> {el.option[i]}/</>
            )
        }
        )


        return (<>
            <div className={s.item} key={el.id + 'basket'}>
                <div className={s.imageItem}>
                    <img src={`https://test2.sionic.ru/img/products/${el.image_name}`}
                        all={`${el.image_name}`} />
                </div>
                <div className={s.aboutitem}>

                    <div>{el.name}</div>
                    <div className={s.option}>
                        {options}
                    </div>
                    <div>Доступно для заказа: {el.stock} ед.</div>
                </div>
                <div className={s.quantity}>
                    <div className={s.increase}><img src="minus.png" alt=""

                        onClick={() => dispatch(dec(el.id))} /></div>
                    <div className={s.value}>
                        {el.quantity}
                    </div>
                    <div className={s.reduce}><img src="plus.png" alt=""
                        onClick={el.quantity < el.stock ? () => dispatch(inc(el.id)) : null} /></div>
                </div>
                <div className={s.priceitem}>
                    <div>Цена: {el.price} &#8381;</div>
                    <div>Сумма: {el.price * el.quantity} &#8381;</div>
                </div>
                <div className={s.deleteitem}>
                    <img src="delete.png" alt="" onClick={() => deleteItemBasket(el.id)} />
                </div>
            </div>
        </>)
    })
    return (<>
        <div className={s.basket}>
            <div className={s.header}>
                <div className={s.h}>Корзина</div>
                <div className={s.options} onClick={() => dispatch(deleteBasket())}>Очистить корзину</div>
            </div>
            <div className={s.body}>
                <div className={s.headeritems}>
                    <div className={s.products}>
                        <h3>Товары</h3>
                    </div>
                    <div className={s.fullprice}>
                        Стоимость корзины:
                        <br></br>
                        {isNaN(sum) ? 0 : sum} &#8381;
                    </div>
                    <NavLink to="/delivery"><div className={s.btnorder}>Оформить</div></NavLink>
                    <div className={s.image}>
                        <img src="basket.jpg" alt="djfdl"></img>
                    </div>
                </div>
                <div className={s.items}>

                    {basketOrm.length == 0 ? 'Корзина пуста' : isLoad ? items : <Preloader />}
                </div>

            </div>
        </div>
    </>)
};
export default Basket;
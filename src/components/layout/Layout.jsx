import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { basketItems, basketQuantity } from "../../redux/orm/selectors";
import s from './layout.module.css';
const Layout = () => {





    const basketQuantityItems = useSelector(state => basketQuantity(state));

    return (
        <>
            <div className={s.layout}>
                <div className={s.leftpanel}>
                    <div className={s.header}>
                        <div className={s.logo}>
                            <NavLink to='/'>
                                <img src="React.png" alt="React" />
                            </NavLink>
                        </div>
                        <div className={s.adres}>
                            <img src="geo.png" alt="адрес" />
                            <div>Сочи</div>
                        </div>
                        <div className={s.find}>
                            <input type="text" placeholder="Поиск бренда, товара, категории..." />
                            <img src="find.png" alt="find" />
                        </div>
                        <div className={s.basketprifile}>
                            <NavLink to='/orders'>
                                <div className={s.basket}>

                                    <img src="orders.png" alt="Basket" />
                                </div>
                            </NavLink>
                            <NavLink to='/basket'>
                                <div className={s.basket}>
                                    <div className={s.quantituitems}>
                                        {basketQuantityItems}
                                    </div>
                                    <img src="basket.png" alt="Basket" />
                                </div>
                            </NavLink>
                            <div className={s.profile}>

                            </div>
                        </div>


                    </div>
                    <div className={s.content} onScroll={(e)=>console.log('dfgf')}>
                        <Outlet />
                    </div>

                </div>
                <div className={s.sidepanel}>
                    <img src="baner1.jpg" />
                    <img src="baner2.jpg" />
                    <img src="baner3.jpg" />
                </div>

            </div>
            <div className={s.footer}>
                <div className={s.line1}>
                    <div className={s.logo}>
                        <img src="React.png" alt="React" />
                    </div>
                    <div className={s.contacts}>
                        <div className={s.seti}>
                            <div className={s.text}>
                                Присоеденяйтесь к нам
                            </div>
                            <div className={s.imgseti}>
                                <img src="Facebook.png"/>
                                <img src="Inst.png"/>
                                <img src="Vk.png"/>
                            </div>
                        </div>
                        <div className={s.app}>
                        <div className={s.text}>
                                Присоеденяйтесь к нам
                            </div>
                            <div className={s.imgseti}>
                                <img src="Google Play.png"/>
                                <img src="App Store.png"/>
                               
                            </div>
                        </div>
                    </div>

                </div>
                <div className={s.line2}>
                    <div>© Sionic</div>
                    <div>Правовая информация</div>
                    <div>Политика конфиденциальности</div>
                </div>

            </div>


        </>
    )
};
export default Layout;
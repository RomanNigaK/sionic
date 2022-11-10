import React, { useEffect, useState } from "react";
import { apiSionic } from "../../api/api";
import Preloadermin from "../commons/Preloadermin";
import s from './order.module.css';
const Item = (props) => {
const [data,setData]=useState(null);
const [img,setImg] = useState(null);


  
useEffect(()=>{
    async function loadProduct(){
        let res = await apiSionic.getProductId(props.data.product_id);
        let imgres = await apiSionic.getImagesProduct(props.data.product_id).then(images => images[0].image_name);
        setImg(imgres);
        setData(res);   
    }
    loadProduct();
})

    return (
                <div className={s.orderitem} key={props.data.key}>   
                    <div className={s.headerItem}>
                        <div className={s.line1}>
                            <div className={s.img}>
                            {img?<img src={`https://test2.sionic.ru/img/products/${img}`} all={`${img}`} />:<div className={s.boximg}><Preloadermin/></div>}
                            
                            </div>
                            <div className={s.nameheader}>
                                <div className={s.name}><b>{data?.name}</b></div>
                                <div className={s.datadetails}>
                                    <div className={s.data}>{props.data.dataOrder}</div>
                                    <div className={s.otherDetails}>Подробнее...</div>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className={s.detailed}>
                            <img src="updetails.png"/>
                        </div>
                    </div>
                    <div className={s.statusNomer}>
                        <div className={s.staus}>
                            <div className={s.headerBlock}>Статус заказа</div>
                            <div className={s.text}>{props.data.status}</div>
                        </div>
                        <div className={s.number}>
                            <div className={s.headerBlock}>Номер заказа</div>
                            <div className={s.text}>{props.data.id+1000}</div>
                        </div>
                    </div>
                    <div className={s.otherdata}>
                        <div className={s.quantity}>
                            <div className={s.headerBlock}>Кол-во товаров</div>
                            <div className={s.text}>{props.data.quantity} шт</div>
                        </div>
                        <div className={s.price}>
                            <div className={s.headerBlock}>Стоимость заказа</div>
                            <div className={s.text}>{props.data.quantity*props.data.price} р</div>
                        </div>
                        <div className={s.price}>
                            <div className={s.headerBlock}>Адрес доставки</div>
                            <div className={s.text}>{props.data.delivery}</div>
                        </div>
                    </div>
                </div>
          )

};
export default Item;
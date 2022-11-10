import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearListVariation } from "../../../redux/appSlice";
import s from './listvariation.module.css'
import { addBasket } from "../../../redux/models/basket";
import { imagesProduct, itemsProductVariationId } from "../../../redux/orm/selectors";

const ListVariations = ({ listVarioations, ...props }) => {

    const dispatch = useDispatch();
    const itemsId = useSelector(state => itemsProductVariationId(state));
    const getImages = useSelector(state => imagesProduct(state, listVarioations.idProduct));


    let img = getImages.map(element => {
        return (<img src={`https://test2.sionic.ru/img/products/${element.image_name}`} className={s.imgSmall} />)

    });


    async function func(obj) {



        dispatch(addBasket(obj))


        dispatch(clearListVariation())
    }


    let l = listVarioations.variations.map(el => {
        let objForDispatchBasket = { id_product: listVarioations.idProduct, product_variation_id: el.id, option: el.specification }
        let f = Object.keys(el.specification);

        let g = f.map(i => {

            return (
                <div>{i} / {el.specification[i]}</div>
            )
        })
        return (
            <div className={s.item} key={el.id + 'list'} onClick={~itemsId.indexOf(el.id) ? null : () => func(objForDispatchBasket)}>

                <div className={s.price} key={el.id + 'price'}>
                    Стоимость: {el.price} &#8381; Остаток: {el.stock} шт <span className={s.selectvariationid}>{~itemsId.indexOf(el.id) ? <div>В корзине</div> : ''}</span>
                </div>
                {g}

            </div>
        )
    })
    return (
        <>
            <div className={s.listvariations}>
                <div className={s.list}>
                    <div className={s.header}></div>
                    <div className={s.nameheader}>
                        <div className={s.name}>{listVarioations.nameProduct}
                            <div className={s.discription}>{listVarioations.descriptionProduct}</div>
                        </div>

                        <div onClick={() => dispatch(clearListVariation())}>close</div>

                    </div>
                    <div className={s.images}>{img}</div>
                    <div className={s.itemsVariations}>

                        {l}
                    </div>
                </div>
            </div>
        </>
    )
};
export default ListVariations;
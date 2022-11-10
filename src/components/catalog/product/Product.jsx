import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiSionic } from "../../../api/api";
import { addProductVariationPropertyValues } from "../../../redux/models/ProductVariationPropertyValue";
import { imagesProduct, variationsProduct } from "../../../redux/orm/selectors";
import Preloader from "../../commons/Preloader";
import ProductVariations from "../productVariations/ProductVariation";
import s from './product.module.css';
const Product = ({ id, name, description, ...props }) => {
    const dispatch = useDispatch();
    const images = useSelector(state => imagesProduct(state, id));
    const varioationsProduct = useSelector(state => variationsProduct(state, id));
    
   
    const [isShow,setIsShow]=useState(false);
    
    useEffect(()=>{
        if(varioationsProduct.length>0){
            async function d(){
                for (let index = 0; index < varioationsProduct.length; index++) {
                    let ff=await apiSionic.getProductVariationPropertyValues(varioationsProduct[index].id);
                    dispatch(addProductVariationPropertyValues(ff));
                    
                }
                
                
            }
            d();
     }
        
      

    },[varioationsProduct])


    if (varioationsProduct.length == 0 || images.length == 0) {
        return (
            <>
                <div className={s.product} key={'itemproduct' + id}>
                    <Preloader />
                </div>
            </>
        )
    }


    let price = varioationsProduct.sort(function (o1, o2) { return o1.price - o2.price; })[0].price
function dispatchObj(boolean){
   
    setIsShow(boolean);
}


//

    return (
        <>
            <div className={s.product} key={'itemproduct' + id}>
                <div className={s.imgproduct} key={'itemproductimg' + id}>
                    
                    <img className={s.imgProduct} src={`https://test2.sionic.ru/img/products/${images[0].image_name}`} alt={images[0].image_name} />
                </div>
                <div className={s.name} key={'itemproductname' + id}>
                    {name}
                </div>
                <div className={s.price} key={'itemproductprice' + id}>
                    {price} 	&#8381;
                </div>
                <div className={s.sale} key={'itemproductsale' + id}></div>
                <div className={s.btnaddbasket} key={'itemproductbasket' + id} onClick={()=>dispatchObj(true)}>
                    Добавить в корзину
                    <div className={s.variations}>
                   
                        {isShow?<ProductVariations  idProduct = {id} dispatchObj={dispatchObj} />:null} 

                    </div>
                     
                </div>
            </div>
        </>
    )
};
export default Product;
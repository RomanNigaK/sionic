import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './catalog.module.css';
import Product from "./product/Product";
import { productsCategory } from "../../redux/orm/selectors";
import Categories from "./categories/Categories";
import { addProduct } from "../../redux/models/Product";
import { apiSionic } from "../../api/api";
import { addProductVariations } from "../../redux/models/ProductVariation";
import { addImages } from "../../redux/models/Image";
import Preloader from "../commons/Preloader";
import InfineScroll from "../commons/infineScroll/InfineScroll";
import { setErrorApp, setIsLoadMoreProducts, setRange, setStartRange } from "../../redux/appSlice";
import Error from "../commons/error/Error";
import Options from "./options/Options";


const Catalog = (props) => {
    const dispatch = useDispatch();
    const range = useSelector(state => state.app.range);
    const sort = useSelector(state => state.app.sort);
    const categories = props.categories;

    const products = useSelector(state => productsCategory(state, props.idCategory));
    


    const viewCatygory = useSelector(state => state.app.viewCatygory);
    const errorApp = useSelector(state => state.app.errorApp);
    const [isOption, setIsOption] = useState(false);
    const isLoadMore = useSelector(state => state.app.isLoadMoreProducts);

    async function loadProducsData(r, s) {

        try {
            let products = await apiSionic.getProducts(props.idCategory, r ? r : range, s).
                catch(err => { throw 'Не удаеться загрузить список товаров...' });

            let ids = [];
            products.forEach(el => {
                ids.push(el.id)
            })
            let imagesProduct = await apiSionic.getImagesProduct(ids);
            let productVariations = await apiSionic.getProductVariations(ids);

            Promise.all([imagesProduct, productVariations]).
                then(values => {
                    dispatch(addImages(values[0]))
                    dispatch(addProductVariations(values[1]))
                    dispatch(setIsLoadMoreProducts(true));
                })
            dispatch(addProduct(products));
        } catch (e) {
            dispatch(setErrorApp(e));
        }
    }

    useEffect(() => {

        loadProducsData(range, sort);

    }, [viewCatygory, sort, range])

    let listProducts;
    if (products) {
        listProducts = products.map(el => {
            return <Product id={el.id} name={el.name} description={el.description} key={'Product' + el.id} />
        });
    }
    return (
        <>
            <div className={s.catalog}>
                <div className={s.header}>
                    <div className={s.h}>
                        Категории товаров
                    </div>
                    <div className={s.options} >

                        <Options isOption={isOption} />
                    </div>
                </div>
                <div className={s.btncroupcategories}>
                    <Categories categories={categories} />
                </div>

                <div className={s.products} >
                    {errorApp ?
                        <Error text={errorApp} /> : products && products.length > 0 ?
                            listProducts : <Preloader max text="Загружаем список товаров" />}
                </div>
            </div>
            <InfineScroll isLoad={isLoadMore} quantityProductsInORM={products?products.length:0}/>
        </>
    )
};
export default React.memo(Catalog);


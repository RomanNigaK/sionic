import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListVariation } from "../../../redux/appSlice";
import { productVariationProperty, productVariationPropertyListValue, productsItems, productVariationPropertyValues, variationsProduct } from "../../../redux/orm/selectors";
const ProductVariations = (props) => {
    console.log(props.idProduct)
    const dispatch = useDispatch();
    class ListVariationsProduct {
        object = {
            variations: []
        }
        constructor(idP, variationIdP, productVPV, productVP, productVPLV) {
            this.idP = idP;
            this.variationIdP = variationIdP;
            this.productVPV = productVPV;
            this.productVP = productVP;
            this.productVPLV = productVPLV;

        }
        _priceStock() {
            this.variationIdP.forEach(el => {
                this.object.variations.push({
                    price: el.price,
                    stock: el.stock,
                    id: el.id,
                })
            })
            console.log(this.object)
        }
        _specification(arr) {
            console.log(arr)

            let specification = {};
            let id;
            arr.forEach(el => {
                id = el.product_variation_id;
                console.log(id);
                let key = this.productVP.find(item => item.id === el.product_variation_property_id).name
                specification[key] = el.value_string ?? el.value_int ?? el.value_float;
                if (el.product_variation_property_list_value_id) {
                    specification[key] = this.productVPLV.find(i => i.id === el.product_variation_property_list_value_id).title
                }
            })
            if (this.object.variations.find(item => item.id === id)) this.object.variations.find(item => item.id === id).specification = specification
        }
        assembling() {
            this._priceStock();
            this.productVPV.forEach(el => {
                this._specification(el);
            })
            return ({
                nameProduct: this.productName,
                descriptionProduct: this.discription,
                idProduct: this.idP,
                variations: this.object.variations.filter(f => f.specification)
            })
        }
        set nameProduct(name) {
            this.productName = name;
        }
        set discriptionProduct(desc) {
            this.discription = desc;
        }
    }


    const product = useSelector(state => productsItems(state, props.idProduct));
    const productVariationsIdProduct = useSelector(state => variationsProduct(state, props.idProduct))
    let arr = [];
    productVariationsIdProduct.forEach(element => { arr.push(element.id) });
    const productVPV = useSelector(state => productVariationPropertyValues(state, arr))
    const productVP = useSelector(state => productVariationProperty(state));
    const productVPLV = useSelector(state => productVariationPropertyListValue(state))

    let g = new ListVariationsProduct(props.idProduct, productVariationsIdProduct, productVPV, productVP, productVPLV);
    g.nameProduct = product.name;
    g.discriptionProduct = product.description;

    props.dispatchObj(false);
    dispatch(setListVariation(g.assembling()))

    return (<></>)
};
export default ProductVariations;
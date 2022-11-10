import { createSelector } from "redux-orm";
import orm from "./orm";
export const category = createSelector(orm.Category);
export const productsCategory = createSelector(orm.Category.Products);
export const imagesProduct = createSelector(orm.Product.Images);
export const variationsProduct = createSelector(orm.Product.ProductVariations);
export const productsItems = createSelector(orm.Product);
export const productVariationPropertyValues = createSelector(orm.ProductVariation.ProductVariationPropertyValues);
export const productVariationProperty = createSelector(orm.ProductVariationProperty);
export const productVariationPropertyListValue = createSelector(orm.ProductVariationPropertyListValue);
export const basketItems = createSelector(orm.Basket);
export const orderItems = createSelector(orm.Order);
export const basketQuantity = createSelector(orm.Basket, (basket) => { return basket.length; });

export const itemsProductVariationId = createSelector(orm.Basket, (basket) => {
    let items = [];
    basket.forEach(element => {
        items.push(element.product_variation_id);
    });
    return items;
});

export const sumBasket = createSelector(orm.Basket, (basket) => {
    let sum = 0;
    basket.forEach(element => {
        sum = sum + (element.quantity * element.price);
    })
    return sum;
})


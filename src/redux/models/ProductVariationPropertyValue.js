import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

export const addProductVariationPropertyValues = createAction("models/ProductVariationPropertyValues/add");

export class ProductVariationPropertyValue extends Model {
  static modelName = "ProductVariationPropertyValue";

  static get fields() {
    return {
      id: attr(),
      product_variation_id: fk("ProductVariation","ProductVariationPropertyValues"),
      product_variation_property_id:fk("ProductVariationProperty","ProductVariationPropertyValues"),
      value_string:attr(),
      value_int:attr(),
      value_float:attr(),
      product_variation_property_list_value_id:fk("ProductVariationPropertyListValue","ProductVariationPropertyValues"),
   };
  }

  static reducer({ type, payload }, Post, session) {
    switch (type) {
      case addProductVariationPropertyValues.type: {
        payload.forEach(element => {
            Post.upsert(element);
        });
          
        
        break;
      }

      default:
        break;
    }
  }
}
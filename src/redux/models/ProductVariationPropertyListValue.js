import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

export const addProductVariationPropertyListValues = createAction("models/ProductVariationPropertyListValues/add");

export class ProductVariationPropertyListValue extends Model {
  static modelName = "ProductVariationPropertyListValue";

  static get fields() {
    return {
      id: attr(),
      product_variation_property_id: fk("ProductVariationProperty","ProductVariationPropertyListValues"),
      title:attr(),
      value:attr(),
   };
  }

  static reducer({ type, payload }, Post, session) {
    switch (type) {
      case addProductVariationPropertyListValues.type: {
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
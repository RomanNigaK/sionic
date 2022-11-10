import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

export const addProductVariations = createAction("models/productVariations/add");

export class ProductVariation extends Model {
  static modelName = "ProductVariation";

  static get fields() {
    return {
      id: attr(),
      product_id: fk("Product","ProductVariations"),
      price:attr(),
      stock:attr(),
   };
  }

  static reducer({ type, payload }, Post, session) {
    switch (type) {
      case addProductVariations.type: {
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
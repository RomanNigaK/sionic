import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

export const addProductVariationProperties = createAction("models/ProductVariationProperties/add");

export class ProductVariationProperty extends Model {
  static modelName = "ProductVariationProperty";

  static get fields() {
    return {
      id: attr(),
      name: attr(),
      type:attr(),
   };
  }

  static reducer({ type, payload }, Post, session) {
    switch (type) {
      case addProductVariationProperties.type: {
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
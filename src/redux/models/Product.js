import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

export const addProduct = createAction("models/product/add");
export const clearProduct = createAction("models/product/clear");

export class Product extends Model {
  static modelName = "Product";

  static get fields() {
    return {
      id: attr(),
      name: attr(),
      category_id:fk("Category","Products"),
      description:attr(),
   };
  }

  static reducer({ type, payload }, Product, session) {
    switch (type) {
      case addProduct.type: {
        payload.forEach(element => {
          Product.upsert(element);
        });
          
        
        break;
      }
      case clearProduct.type: {
       
          Product.delete();
        
          
        
        break;
      }

      default:
        break;
    }
  }
}
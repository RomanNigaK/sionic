import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";


export const addBasket = createAction("models/basket/add");
export const deleteItemOrm = createAction("models/basket/deleteitem");
export const inc = createAction("models/basket/inc");
export const dec = createAction("models/basket/dec");
export const deleteBasket = createAction("models/basket/deleteBasket");


export class Basket extends Model {
  static modelName = "Basket";

  static get fields() {
    return {
      id: attr(),
      product_id:fk("Product","Baskets"),
      product_variation_id: fk("ProductVariation","Baskets"),
    
   };
  }

  static reducer({ type, payload }, Basket, session) {
    switch (type) {
      case addBasket.type: {
        Basket.upsert(payload);
       break;
      }
      case deleteItemOrm.type:{
        Basket.withId(payload).delete();
        break;
      }
      case deleteBasket.type:{
        Basket.delete();
        break;
      }
      case inc.type:{
       ++ Basket.withId(payload).quantity;
        break;
      }
      case dec.type:{
        if(Basket.withId(payload).quantity>1)-- Basket.withId(payload).quantity;
        
        break;
      }

      default:
        break;
    }
  }
}
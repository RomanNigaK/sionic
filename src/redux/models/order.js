import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";


export const addOrder = createAction("models/order/add");


export class Order extends Model {
  static modelName = "Order";

  static get fields() {
    return {
      id: attr(),
      product_id:fk("Product","Orders"),
      product_variation_id: fk("ProductVariation","Orders"),
      dataOrder:attr(),
      quantity:attr(),
      price:attr(),
      delivery:attr(),
      status:attr(),

    
   };
  }

  static reducer({ type, payload }, Order, session) {
    switch (type) {
      case addOrder.type: {
         payload.forEach(element => {
             Order.upsert(element);
         });
        
       break;
      }


      default:
        break;
    }
  }
}
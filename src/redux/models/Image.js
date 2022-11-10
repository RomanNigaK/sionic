import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

export const addImages = createAction("models/images/add");

export class Image extends Model {
  static modelName = "Image";

  static get fields() {
    return {
      id: attr(),
      image_name: attr(),
      product_id:fk("Product","Images"),
      image_url:attr(),
   };
  }

  static reducer({ type, payload }, Post, session) {
    switch (type) {
      case addImages.type: {
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
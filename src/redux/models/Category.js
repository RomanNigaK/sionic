import { createAction } from "@reduxjs/toolkit";
import Model, { attr, fk } from "redux-orm";

export const addCategory = createAction("models/category/add");

export class Category extends Model {
  static modelName = "Category";

  static get fields() {
    return {
      id: attr(),
      name: attr(),
   };
  }

  static reducer({ type, payload }, Post, session) {
    switch (type) {
      case addCategory.type: {
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
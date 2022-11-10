import { ORM, createReducer } from "redux-orm";

import * as allModels  from './../models/models';
const orm = new ORM({ stateSelector: (state) => state.orm });

console.log(allModels)
const models = Object.values(allModels);
orm.register(...models);

const reducer = createReducer(orm);

export { orm, reducer };
export default orm;
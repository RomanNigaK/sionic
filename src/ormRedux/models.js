import { ORM, createReducer } from "redux-orm";
import {Post} from './book';
import { User } from "./user";




const orm = new ORM({ stateSelector: (state) => state.orm });


orm.register(Post,User);

const reducer = createReducer(orm);

export { orm, reducer };
export default orm;
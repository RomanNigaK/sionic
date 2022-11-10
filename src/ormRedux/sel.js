import { createSelector } from "redux-orm";
import Post from "./book";

export const Book = createSelector(Post);

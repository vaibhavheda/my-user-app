import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./StoreReducer";

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));

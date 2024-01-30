import { configureStore } from "@reduxjs/toolkit";
import product from "./store/reducers/product";
export default configureStore({
    reducer:{product}
})
import { createSlice } from "@reduxjs/toolkit";
import { findById } from "../../utils/helpers";
import { uiActions } from "./uiSlice";
import { BASE_URL } from "../../utils/constans/general";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      console.log(action);
      const newItem = action.payload;
      const existingItem = findById(state, newItem.id);
      state.totalAmount++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          name: newItem.title,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = findById(state, id);
      state.totalAmount--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

export const sendCartDate = (cart) => {
  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending",
        message: "Sending data",
      })
    );
    fetch(BASE_URL, {
      method: "PUT",
      body: JSON.stringify(cart),
    }).then((response) => {
      // if (!response.ok) {
      //   throw new Error("Setting data failed");
      // }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sending cart data succesfully",
        })
      );
    });
  };
};

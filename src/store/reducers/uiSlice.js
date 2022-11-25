import { createSlice } from "@reduxjs/toolkit";
const TOGGLE = "TOGGLE";
export function toggle() {
  return {
    type: TOGGLE,
  };
}

const initialState = {
  cartVisible: false,
  notication: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggle(state, action) {
      //автоматом будет создават экшен , где уже есть тип
      state.cartVisible = !state.cartVisible;
    },
    showNotification(state, action) {
      state.notication = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notication = null;
    },
  },
});

// console.log(uiSlice.actions.toggle())

export const uiActions = uiSlice.actions;
export default uiSlice;

import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      let item = state.items.find((item) => item._id === action.payload._id);

      const data = { ...action.payload, quantity: 1 };

      if (!item) {
        state.items.push(data);
      } else {
        item.quantity++;
      }
    },

    removeItem: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.items = state.items.filter((i) => i._id !== item._id);
        }
      }
    },

    clearCart: (state) => {
      console.log("Item cleared");
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;

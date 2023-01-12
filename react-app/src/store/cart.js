import { Add, CarpenterSharp } from "@mui/icons-material";
import { csrfFetch } from "./csrf";

const GET_CART = "item/GET_CART";
const ADD_CART_ITEM = "item/ADD_CART_ITEM";
const DELETE_CART_ITEM = "item/DELETE_CART_ITEM";

const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

const cartItem = (item) => ({
  type: ADD_CART_ITEM,
  item,
});

const delCartItem = (item) => ({
  type: DELETE_CART_ITEM,
  item,
});

export const fetchCart = (cartId) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart/${cartId}/items/`);
  const { cart_items } = await res.json();
  // console.log(cart_items, "CARTS");

  if (res.ok) {
    const data = {};
    cart_items.forEach((item) => (data[item.id] = item));

    dispatch(getCart(data));
    return res;
  }
};

export const addCartItem =
  ({ item_id, cart_id }) =>
  async (dispatch) => {
    // console.log({ item_id }, "ITEMID@@!#");
    const res = await csrfFetch(`/api/cart/${cart_id}/items/${item_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id, cart_id }),
    });
    if (res.ok) {
      const newCartItem = await res.json();
      // console.log(newCartItem, "RHEARASrWRWQ");
      dispatch(cartItem(newCartItem));
    }
  };

export const removeCartItem =
  ({ item_id, cart_id }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${cart_id}/items/${item_id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(delCartItem({ item_id, cart_id }));
      return res;
    }
  };

const inititalState = {};
const cartReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_CART:
      // newState = { ...state, ...action.cart };
      // return newState;
      // console.log(action.cart, "AHUDSADWQDSAD");
      return { ...state, ...action.cart };

    case ADD_CART_ITEM:
      // console.log(action.item, "HRERE");
      newState = { ...state, [action.item.cart_id]: action.item };
      return newState;

    case DELETE_CART_ITEM:
      delete newState[action.item.id];
      return newState;

    default:
      return state;
  }
};

export default cartReducer;

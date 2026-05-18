import { API } from "../_api";

export const getCart = async () => {
  const { data } = await API.get("/carts");
  return data.data;
};

export const addCartItem = async (payload) => {
  try {
    const { data } = await API.post("/cart-items", payload);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeCartItem = async (id) => {
  try {
    await API.delete(`/cart-items/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

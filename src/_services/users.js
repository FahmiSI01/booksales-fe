import { API } from "../_api";

export const getUsers = async () => {
  const { data } = await API.get("/users");
  return data.data;
};

export const createUser = async (payload) => {
  try {
    const { data } = await API.post("/users", payload);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const showUser = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`);
    return data.data;
  } catch (error) { 
    console.log(error);
    throw error;
  }
};

export const updateUser = async (id, payload) => {
  try {
    // Catatan: Laravel apiResource default-nya menggunakan PUT/PATCH untuk update.
    // Jika menggunakan API.post seperti ini mengalami error "405 Method Not Allowed", 
    // Anda bisa menggantinya menjadi API.put(`/users/${id}`, payload) 
    // atau tambahkan _method: "PUT" di dalam payload.
    const response = await API.post(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await API.delete(`/users/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

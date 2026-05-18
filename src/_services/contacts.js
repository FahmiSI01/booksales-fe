import { API } from "../_api";

export const getContacts = async () => {
  const { data } = await API.get("/contacts");
  return data.data || [];
};

export const createContact = async (payload) => {
  try {
    const { data } = await API.post("/contacts", payload);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const showContact = async (id) => {
  try {
    const { data } = await API.get(`/contacts/${id}`);
    return data.data;
  } catch (error) { 
    console.log(error);
    throw error;
  }
};

export const updateContact = async (id, payload) => {
  try {
    // We use PUT or _method: "PUT" in POST for Laravel
    const response = await API.post(`/contacts/${id}`, { ...payload, _method: 'PUT' });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    await API.delete(`/contacts/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

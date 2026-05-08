import  { API }  from "../_api";

export const getTransactions = async () => {
  const { data } = await API.get("/transactions", {
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  return data.data
}

export const createTransactions = async (data) => {
  try{
    const response = await API.post("/transactions", data, {
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
    }})
    return response.data

  }catch (error){
  console.log(error.response.data);
  alert(JSON.stringify(error.response.data));
  throw error;
}
}

export const showTransactions = async (id) => {
  try{
    const { data } = await API.get(`/transactions/${id}`,{
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return data.data

  }catch (error) {
    console.log(error);
    throw error
  }
}

export const updateTransactions = async (id,data) => {
  try{
    const response = await API.put(`/transactions/${id}`, data, {
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  }catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteTransactions = async (id) => {
  try{
    await API.delete(`/transactions/${id}`,{
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

  }catch (error){
    console.log(error);
    throw error
  }

}
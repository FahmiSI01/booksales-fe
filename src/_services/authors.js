import API from "../_api"

export const getAuthors = async () => {
  const { data } = await API.get("/authors")
  return data.data
};

export const createAuthor = async (payload) => {
  try {
    const { data } = await API.post("/authors", payload)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
};
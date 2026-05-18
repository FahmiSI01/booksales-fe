import { useJwt } from "react-jwt";
import { API } from "../_api";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post('/login', { email, password })
    return data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const register = async ({ name, email, password }) => {
  try {
    const { data } = await API.post('/register', { name, email, password })
    return data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: "Token expired",
        data: null
      }
    }

    return {
      success: true,
      message: "Token valid",
      data: decodedToken
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}

export const logout = async ({ token }) => {
  try {
    const { data } = await API.post('/logout', { token })
    return data
  } catch (error) {
    console.warn("Backend logout failed (token might be expired), clearing local storage anyway.");
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userInfo')
  }
}
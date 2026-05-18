import axios from "axios";

// Pastikan menggunakan backtick (tombol di sebelah angka 1)
const url = "http://127.0.0.1:8000";

export const API = axios.create({
  // GUNAKAN BACKTICK ` BUKAN '
  baseURL: `${url}/api`, 
});

// Tambahkan interceptor untuk menyisipkan token secara otomatis
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// GUNAKAN BACKTICK ` BUKAN '
export const bookImageStorage = `${url}/storage`;
import axios from "axios";

// Pastikan menggunakan backtick (tombol di sebelah angka 1)
const url = "http://127.0.0.1:8000";

export const API = axios.create({
  // GUNAKAN BACKTICK ` BUKAN '
  baseURL: `${url}/api`, 
});

// GUNAKAN BACKTICK ` BUKAN '
export const bookImageStorage = `${url}/storage`;
import axios from "axios"

export default serverAPI = axios.create({
  baseURL: 'http://192.168.8.102:3000',
});
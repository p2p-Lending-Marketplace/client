import axios from "axios"

export default serverAPI = axios.create({
  baseURL: 'http://192.168.43.73:3000',
});
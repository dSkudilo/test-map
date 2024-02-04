import axios from 'axios'

const baseAxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})
export default baseAxios

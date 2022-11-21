import axios from 'axios'
import { getEnvVariables } from '../utils/env/getEnvVariables'

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
})

// Configurar los interceptores

export default calendarApi

import axios from 'axios'

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Configurar los interceptores

export default calendarApi

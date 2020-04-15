import axios from 'axios'
import { environment } from './environment'

const request = axios.create({
  baseURL: `${environment.server.baseURL}:${environment.server.port}`,
  timeout: 50000
})

export default request
import axios from 'axios'

const instance = axios.create({
    baseURL : "http://localhost:8082/api/invitation/"
})

export default instance;
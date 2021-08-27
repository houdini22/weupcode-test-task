import axios from 'axios'
import config from '../config'

const instance = axios.create({
    baseURL: config['api']['baseURL'],
    timeout: config['api']['timeout'],
    headers: {
        'x-requested-with': "http://localhost"
    }
})

export default instance
export { instance as http }

import axios from 'axios';

export default {
    customApi(method, url) {
        return axios.create({
            baseURL: `http://localhost:1337`
        })[method](url)
    },

    customApiParam(method, url, obj) {
        return axios.create({
            baseURL: `http://localhost:1337`
        })[method](url, obj)
    }
}
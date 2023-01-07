import axios from 'axios'
const baseUrl = `/api/persons`

const create = () => {
    return axios.get(baseUrl)
}

const update = (newPerson) => {
    return axios.post(baseUrl, newPerson)
} 

const poista = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const put = (newPerson) => {
    return axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
}

export default {create, update, poista, put}

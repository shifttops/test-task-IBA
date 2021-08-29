import axios from "axios";

const toServer = axios.create ( {
    baseURL: 'http://cors-anywhere.herokuapp.com/http://212.98.184.15:8080/' ,
    headers: {'Origin': 'http://212.98.184.15:8080/'}
} )

const API = {
    getUsers: async () => {
        return (await toServer.get ( 'users' )).data
    } ,
    deleteUser: async (id) => {
        return (await toServer.delete ( `delete/${ id }` )).data
    } ,
    addUser: async (userData) => {
        return (await toServer.post('create', {Name: userData.Name, Description: userData.Description, Date: userData.Date})).data
    },
    editUserInfo: async (userData, id) => {
        return (await toServer.post(`edit/${id}`, {Name: userData.Name, Description: userData.Description, Date: userData.Date})).data
    }
}

export default API;
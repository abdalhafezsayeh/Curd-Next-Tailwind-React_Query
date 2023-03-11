import axios from "axios";


export const reqGetUsers = () => {
    return axios.get('http://localhost:4000/users')

}
import axios from "axios";


// Get ALL Users 
export const getAllUsers = () => {
    return axios.get('http://localhost:4000/users')
}

// Add User 
export const addUser = (user) => {
    return axios.post(`http://localhost:4000/users`, user)
}

// Get User 
export const getUser = (id) => {
    return axios.get(`http://localhost:4000/users/${id}`)
}




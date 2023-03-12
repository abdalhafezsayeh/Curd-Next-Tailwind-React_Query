import axios from "axios";


// Get ALL Users 
export const getAllUsers = () => {
    return axios.get('http://localhost:4000/users')
}

// Add User 
export const addUser = (user) => {
    return axios.post(`http://localhost:4000/users`, user)
}

// Delete User
export const deleteUser = (id) => {
    return axios.delete(`http://localhost:4000/users/${id}`)
}

// Get User 
export const getUser = (id) => {
    return axios.get(`http://localhost:4000/users/${id}`)
}

// Update User 
export const updateUser = (id, updata) => {
    return axios.put(`http://localhost:4000/users/${id}`, updata)
}





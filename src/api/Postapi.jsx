import axios from 'axios';

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

//get method to read the data using axios  
export const getPost = () => {
    return api.get("/posts");
};

//delete method to delete the data using axios  
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
}
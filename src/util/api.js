import axios from "axios";

const baseURL = "https://ez-photoshopbattles-api.herokuapp.com";

// TODO catch errors from api calls

export function getCategory(category) {
  return axios
    .get(`${baseURL}/v1/categories/${category}`)
    .then((res) => res.data);
}

export function getPost(post) {
  return axios.get(`${baseURL}/v1/posts/${post}`).then((res) => res.data);
}

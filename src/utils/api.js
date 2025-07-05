import { getToken } from "./token";
import { baseUrl } from "./constants";
const BASE_URL = baseUrl;

export const checkOk = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getItems = () => {
  return fetch(`${BASE_URL}/items`).then((res) => checkOk(res));
};

const uploadItem = ({ name, weather, imageUrl }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then((res) => checkOk(res));
};

const deleteItem = (id) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => checkOk(res));
};

const updateProfile = ({ name, avatar }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => checkOk(res));
};

const addCardLike = (id) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  }).then((res) => checkOk(res));
};

const removeCardLike = (id) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  }).then((res) => checkOk(res));
};

export default {
  getItems,
  uploadItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
  checkOk,
};

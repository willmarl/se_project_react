const baseUrl = "http://localhost:3001";

const checkOk = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => checkOk(res));
};

const uploadItem = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then((res) => checkOk(res));
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => checkOk(res));
};

export default { getItems, uploadItem, deleteItem };

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getItems() {
    return fetch(`${this._baseUrl}/items`).then((res) => this._checkOk(res));
  }

  uploadItem({ name, weather, imageUrl }) {
    return fetch(`${this._baseUrl}/items`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        weather,
        imageUrl,
      }),
    }).then(this._checkOk);
  }
}

export default Api;

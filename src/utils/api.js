const baseUrl = process.env.NODE_ENV === "production"
  ? "put the URL for your deployed backend here, including https://"
  : "http://api.dan12345.hardsoft.nu";

function getToken() {
  return localStorage.getItem('jwt')
}

export const checkResponse = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error ${res.status}`)
}

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse)
}

export const addItem = (name, imageUrl, weather) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse)
}

export const deleteItem = id => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse)
}

export const editProfile = (name, avatar) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse)
}

export const addCardLike = (id) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },

  }).then(checkResponse)
}


export const removeCardLike = (id) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },

  }).then(checkResponse)
}

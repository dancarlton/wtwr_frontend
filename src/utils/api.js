const baseUrl = 'http://localhost:3001'

function getToken(){
  return localStorage.getItem('jwt')
}

const checkResponse = (res) => {
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
      'authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse)
}

export const deleteItem = id => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then(checkResponse)
}

export const editProfile = (name, imageUrl) => {
  return fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, imageUrl }),
  }).then(checkResponse)
}

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ id, token }),
  }).then(checkResponse)
}

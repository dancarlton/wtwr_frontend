const baseUrl = 'http://localhost:3001'

export const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch items')
      }
      return response.json()
    })
    .catch(error => {
      console.error('Error fetching items:', error)
    })
}

export const addItem = (name, imageUrl, weather) => {
  // console.log(name, imageUrl, weather)

  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add item')
      }
      return response.json()
    })
    .catch(error => {
      console.error('Error adding item:', error)
    })
}

export const deleteItem = (id) => {
    return fetch(`${baseUrl}/items/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

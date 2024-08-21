const baseURL = "http://localhost:3003";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseURL}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function removeItems(id) {
  return fetch(`${baseURL}/items/${id}`, {
    method: "DELETE",
  }).then(handleServerResponse);
}

function addItems(name, link, weatherinput) {
  return fetch(`${baseURL}/items`, {
    method: "POST",
    body: JSON.stringify({
      name,
      weatherinput,
      link,
    }),
  }).then(handleServerResponse);
}

const api = {
  getItems,
  removeItems,
  addItems,
};

export default api;

// export { getItems, removeItems };

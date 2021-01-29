const axios = require("axios");

function getUser(id) {
  return axios
    .get("https://jsonplaceholder.cypress.io/users/" + id)
    .then(function (response) {
      return {
        id: response.data.id,
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
      };
    })
    .catch(function (error) {
      return {
        code: 500,
        response: error,
      };
    });
}

module.exports = { getUser };

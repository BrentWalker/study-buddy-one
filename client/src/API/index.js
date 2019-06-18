import axios from "axios";

const API = {};

(function(API) {
  API.users = API.users || {};
  API.technologies = API.technologies || {};
  API.categories = API.categories || {};

  API.users.show = async function(obj) {
    let users = await axios
      .get(`http://localhost:8000/api/v1/users/${obj._id}`)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not list users." };
      });

    return users;
  };
  API.users.list = async function() {
    let users = await axios
      .get("http://localhost:8000/api/v1/users/")
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not list users." };
      });

    return users;
  };
  API.users.update = async function(data) {
    const { _id } = data;
    delete data._id;
    const postRequest = {
      method: "post",
      url: `http://localhost:8000/api/v1/users/update/${_id}`,
      data,
    };
    let users = await axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not list users." };
      });
    return users;
  };
  API.users.new = async function(data) {
    const postRequest = {
      method: "post",
      url: `http://localhost:8000/api/v1/users/add/`,
      data,
      port: 8000
    };
    let users = await axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not add user" };
      });
    return users;
  };
  API.users.delete = async function(data) {
    const { _id } = data;
    // delete data._id;
    const postRequest = {
      method: "delete",
      url: `http://localhost:8000/api/v1/users/delete/${_id}`
    };
    let users = axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not delete user" };
      });

    return users;
  };


  API.technologies.show = async function(obj) {
    let technologies = await axios
      .get(`http://localhost:8000/api/v1/technologies/${obj._id}`)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "could not list technologies" };
      });

    return technologies;
  };
  API.technologies.list = async function() {
    let technologies = await axios
      .get("http://localhost:8000/api/v1/technologies/")
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not list technologies" };
      });
    return technologies;
  };
  API.technologies.update = async function(data) {
    const { _id } = data;
    delete data._id;
    const postRequest = {
      method: "post",
      url: `http://localhost:8000/api/v1/technologies/update/${_id}`,
      data
    };
    let technologies = await axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not list technologies." };
      });
    return technologies;
  };
  API.technologies.new = async function(data) {
    const postRequest = {
      method: "post",
      url: `http://localhost:8000/api/v1/technologies/add`,
      data
    };
    let technologies = await axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not add technology" };
      });
    return technologies;
  };
  API.technologies.delete = async function(data) {
    const { _id } = data;
    // delete data._id;
    const postRequest = {
      method: "delete",
      url: `http://localhost:8000/api/v1/technologies/delete/${_id}`
    };
    let technologies = axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not delete technology" };
      });

    return technologies;
  };


  API.categories.show = async function(obj) {
    let categories = await axios
      .get(`http://localhost:8000/api/v1/categories/${obj._id}`)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "could not list categories" };
      });

    return categories;
  };
  API.categories.list = async function() {
    let categories = await axios
      .get("http://localhost:8000/api/v1/categories/")
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not list categories" };
      });
    return categories;
  };
  API.categories.update = async function(data) {
    const { _id } = data;
    delete data._id;
    const postRequest = {
      method: "post",
      url: `http://localhost:8000/api/v1/categories/update/${_id}`,
      data
    };
    let categories = await axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not list categories." };
      });
    return categories;
  };
  API.categories.new = async function(data) {
    const postRequest = {
      method: "post",
      url: `http://localhost:8000/api/v1/categories/add`,
      data
    };
    let categories = await axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not add category" };
      });
    return categories;
  };
  API.categories.delete = async function(data) {
    const { _id } = data;
    // delete data._id;
    const postRequest = {
      method: "delete",
      url: `http://localhost:8000/api/v1/categories/delete/${_id}`
    };
    let categories = axios(postRequest)
      .then(response => {
        const { data } = response;
        return data;
      })
      .catch(function(error) {
        console.log(error);
        return { error: "Could not delete category" };
      });

    return categories;
  };


})(API);

export default API;

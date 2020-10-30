angular.module("projetoCrud").service("usersAPI", function ($http, config) {

  this.getUsers = function () {
    return $http.get("http://localhost:3000/api/users")
  }

  this.postUsers = function (user) {
    return $http.post("http://localhost:3000/api/signup", user)
  } 

  this.loginUser = function (login) {
    return $http.post("http://localhost:3000/api/login", login)
  }

  this.atualizarUser = function (id, editar) {
    return $http.put(`http://localhost:3000/api/users/${id}`, editar, {headers: { token: localStorage.getItem("token") }})
  }

  this.deletarUser = function (id) {
    return $http.delete(`http://localhost:3000/api/users/${id}`, {headers: { token: localStorage.getItem("token") }})
  }
});
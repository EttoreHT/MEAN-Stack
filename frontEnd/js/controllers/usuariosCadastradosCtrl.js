angular.module("projetoCrud").controller("usuariosCadastradosCtrl", function ($scope, usersAPI, $location) {
  $scope.app = "Projeto Crud";
  $scope.users = [];
  $scope.User = {};

  $scope.selectUser = function(id, name, email, password, data) {
    $scope.User['id'] = id;
    $scope.User['name'] = name;
    $scope.User['email'] = email;
    $scope.User['password'] = password;
    $scope.User['data'] = data;
  }

  $scope.deletaUser = function() {
    console.log('User id', $scope.User.id);
    usersAPI.deletarUser($scope.User.id)
    .then( user => {
      $('#modalExcluir').modal('hide');
      carregarUsers();
      console.log(user);
    }).catch((e) =>{
      console.log(e)
    })
  }
  
  let carregarUsers = function () {
    usersAPI.getUsers()
      .then( (users) => {
        return $scope.users = users.data
      })
      .catch((e) =>{
        return console.log(e)
      })
  };

  $scope.atualizaUser = function() {
    console.log('User id', $scope.User.id);
    console.log('User name', $scope.User.name);
    console.log('User email', $scope.User.email);
    console.log('User password', $scope.User.password);
    usersAPI.atualizarUser($scope.User.id, $scope.editar) //os dados novo vem do formulário !
    .then( User => {
      $('#modalEditar').modal('hide');
      carregarUsers();
      return console.log(User);
    }).catch((e) => {
      return console.log(e)
    })
  }

  $scope.deslogarDoSistema = function() {
    localStorage.removeItem('token');
    $location.path('/login');
  }

  carregarUsers();
})
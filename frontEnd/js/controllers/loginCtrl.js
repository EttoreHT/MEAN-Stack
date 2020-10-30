angular.module("projetoCrud").controller("loginCtrl", function ($scope, usersAPI, autenticacaoAPI, $location) {
  $scope.app = "Projeto Crud";
  
  $scope.cadastrarUser = function() {
    usersAPI.postUsers($scope.user)
      .then((user) => {
        $('#modalCadastro').modal('hide');
        return console.log(user.data.message);
      }).catch((e) =>{
        return console.log(e)
      })
  };


  $scope.loginUser = function() {

    console.log("Escopo: ", $scope.login);
    usersAPI.loginUser($scope.login)
      .then((login) => {
        window.localStorage.setItem('token', login.data.token);
        const retorno =  autenticacaoAPI.autenticarUser(login.data.token);
        //console.log("RETORNO: " + retorno);
        if (autenticacaoAPI.autenticarUser(login.data.token)) {
          data.authorize === true;
        }
        console.log(alert('Usuário logado com sucesso'));
        $location.path('/users');
        // return 
      }).catch((e) =>{
        return console.log("Erro: ", e)
      })
  }
})
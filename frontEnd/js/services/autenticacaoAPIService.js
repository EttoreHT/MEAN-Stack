angular.module("projetoCrud").service("autenticacaoAPI", function ($http) {

  this.autenticarUser = function (token) {
    
      $http.post("http://localhost:3000/api/auth", { token: token}).then((data) => {
        
      console.log(data);
      // return 
      //return res.status(401).json({ message: "Token não validado front" });
    })
  }

});
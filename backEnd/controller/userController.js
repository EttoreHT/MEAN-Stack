const User = require("../model/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  async cadastrarUser(req, res) {
    let userFinded = await User.findOne({
      email: req.body.email
    });
    if (userFinded) {
      return res.status(400).json({
        msg: "O usuário já esta cadastrado"
      });
    }

    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save()
      .then(response => res.status(200).json({
        message: 'Usuário cadastrado com sucesso'
      }))
      .catch(e => res.status(400).json({
        message: 'Erro ao cadastrar usuário'
      }));
  };

  async loginUser(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        message: "Usuário não encontrado."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);

    if (!isMatch)
      return res.status(400).json({
        message: "Dados incorretos!"
      });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: "10d"
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          name: user.name,
          email: user.email,
          token: token
        });
      }
    );
  } catch(e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }

  async autenticarUsers(req, res, next) {

    console.log(req.body.token);
    if (!req.body.token)
      return res.status(401).json({ message: "Token não validado back" });

    try {
      const decoded = jwt.verify(req.body.token, "randomString");
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Invalid Token" });
    }

    return res.send({
      authorize: true
    })
  };


  async mostrarUsers(req, res) {
    await User
      .find({}) // Procura todos sem parametros
      .then(data => {
        res.status(201).send(data);
      }).catch(e => {
        res.status(400).send(e);
      });
  }

  async deleteUsers(req, res, next) {
    await User
      .remove({ _id: req.params.id })
      .then(x => {
        res.status(200).send({
          message: 'Usuário removido com sucesso!'
        });
      }).catch(e => {
        res.status(400).send({
          message: 'Falha ao remover usuário',
          data: e
        });
      });
  };

  async atualizarUsers(req, res, next) {

    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(req.body.password, salt);

    await User
      .update({ _id: req.params.id }, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: passwordCrypt
        }
      }).then(x => {
        res.status(200).send({
          message: 'Usuário atualizado com sucesso!'
        });
      }).catch(e => {
        res.status(400).send({
          message: 'Falha ao atualizar usuário',
          data: e
        });
      });
  };
}


module.exports = new UserController();
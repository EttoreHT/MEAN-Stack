// Biblioteca Jason Web Token
const jwt = require("jsonwebtoken");

const validacaoCadastro = (req, res, next) => {

  let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

  const { name, email } = req.body;
  if (name.length < 4) {
    res.status(500).send('O campo name deve ter ao mínimo 3 caracteres')
  }  else if (!reg.test(email)) {
    res.status(500).send('Email inválido');
  } else {
    next();
  }
}

  let checkToken = (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth Error" });

    try {
      const decoded = jwt.verify(token, "randomString");
      req.user = decoded.user;
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Invalid Token" });
    }
  };

module.exports = {
  validatorCadastro: validacaoCadastro,
  checkToken: checkToken
}
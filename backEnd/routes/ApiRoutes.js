const userController = require('../controller/userController');
const router = require('express').Router();
const { validatorCadastro, checkToken } = require('../middleware/Auth');

router.post('/signup', validatorCadastro, userController.cadastrarUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.mostrarUsers);
router.delete('/users/:id', checkToken, userController.deleteUsers);
router.put('/users/:id', checkToken, userController.atualizarUsers);
router.post('/auth', userController.autenticarUsers);

module.exports = router;
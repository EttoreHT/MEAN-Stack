const mongoose = require('../config/database');

const UsuarioSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// para exportar o model com seu Schema
module.exports = mongoose.model("usuario", UsuarioSchema);
const mongoose = require("mongoose");

// Replace this with your UrlMongo
const UrlMongo = "your database"

mongoose.connect(UrlMongo, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
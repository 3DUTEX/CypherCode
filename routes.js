const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");

//rotas Home
route.get("/", homeController.index);

//rotas Login
route.get("/login", loginController.index);
route.post("/login", loginController.loginPOST);
route.get("/login/cadastrar", loginController.cadastrar);
route.post("/login/cadastrar", loginController.cadastrarPOST);

module.exports = route;

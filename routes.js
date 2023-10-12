const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const pedidoController = require("./src/controllers/pedidoController");
const {naoLogado, loginNecessario} = require("./src/middlewares/middleware");

//rotas Home
route.get("/", homeController.index);

//rotas Login
route.get("/login", naoLogado, loginController.index);
route.post("/login", naoLogado, loginController.loginPOST);
route.get("/login/cadastrar", naoLogado, loginController.cadastrar);
route.post("/login/cadastrar", naoLogado, loginController.cadastrarPOST);
route.get("/login/logout", loginNecessario, loginController.logout);

//rotas pedido
route.get("/pedido", loginNecessario, pedidoController.index);
route.post("/pedido", loginNecessario, pedidoController.indexPost);

module.exports = route;

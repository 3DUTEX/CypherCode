const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const perfilController = require("./src/controllers/perfilController");
const { naoLogado, loginNecessario } = require("./src/middlewares/middleware");

//rotas Home
route.get("/", homeController.index);

//rotas Login
route.get("/login", naoLogado, loginController.index);
route.post("/login", naoLogado, loginController.loginPOST);
route.get("/login/cadastrar", naoLogado, loginController.cadastrar);
route.post("/login/cadastrar", naoLogado, loginController.cadastrarPOST);
route.get("/login/logout", loginNecessario, loginController.logout);

//rotas perfil
route.get("/perfil", loginNecessario, perfilController.perfil);
route.get("/perfil/pedido", loginNecessario, perfilController.index);
route.post("/perfil/pedido", loginNecessario, perfilController.indexPost);
route.get("/perfil/editarPedido/:id", loginNecessario, perfilController.editPed);
route.post("/perfil/editarPedido/:id", loginNecessario, perfilController.editPedPOST);


module.exports = route;

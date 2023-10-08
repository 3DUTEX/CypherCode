const Cadastrar = require("../models/CadastrarModel");

exports.index = (req, res) => {
    res.render("login");
}

exports.loginPOST = (req, res) => {
    res.send(req.body);
}

exports.cadastrar = (req, res) => {
    res.render("cadastrar");
}

exports.cadastrarPOST = async (req, res) => {
    const cadastrar = new Cadastrar(req.body);
    await cadastrar.registraDB();
    if (cadastrar.erros.length > 0) {
        req.flash("erros", cadastrar.erros);
        req.session.save(() => {
            res.redirect("/login/cadastrar");
        })
        return;
    }

    req.flash("sucesso", "Usuário cadastrado com sucesso.");
    req.session.save(() => {
        res.redirect("/login");
    })
}
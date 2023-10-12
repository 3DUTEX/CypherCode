const Login = require("../models/LoginModel");
const Email = require("../models/EmailModel");


exports.index = (req, res) => {
    res.render("login");
}

exports.loginPOST = async(req, res) => {
    try{
        const login = new Login(req.body);
        await login.logarDB();
        if(login.erros.length > 0){
            req.flash("erros", login.erros);
            req.session.save(() => {
                res.redirect("/login");
            });
            return;
        }

        req.session.usuario = login.user;
        res.redirect("/");
    }catch(err){
        console.log(err);
        res.render("404");
    }
}

exports.cadastrar = (req, res) => {
    res.render("cadastrar");
}

exports.cadastrarPOST = async (req, res) => {
    const login = new Login(req.body);
    try{
        await login.registraDB();
        if (login.erros.length > 0) {
            req.flash("erros", login.erros);
            req.session.save(() => {
                res.redirect("/login/cadastrar");
            })
            return;
        }
    
        const email = new Email();
        await email.emailCadastrado(req.body.email, req.body.usuario);
        req.flash("sucesso", "Usuário cadastrado com sucesso.");
        req.session.save(() => {
            res.redirect("/login");
        })

    }catch(err){
        console.log(err);
        res.render("404");
    }

};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}
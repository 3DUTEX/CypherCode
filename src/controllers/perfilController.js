const Pedido = require("../models/PedidoModel");

exports.index = (req, res) => {
    res.render("pedido");
}

exports.indexPost = async (req, res) => {
    const pedido = new Pedido(req.body, req.session.usuario);
    try {
        await pedido.registraPedidoBD();
        if (pedido.erros.length > 0) {
            req.flash("erros", pedido.erros);
            req.session.save(() => {
                res.redirect("/perfil/pedido");
            });
            return;
        }
    } catch (err) {
        console.log(err);
        res.render("404");
    }

    req.flash("sucesso", "Pedido realizado com sucesso, aguarde nossa equipe entrar em contato.");
    req.session.save(() => {
        res.redirect("/perfil");
    });
}

exports.perfil = (req, res) => {
    try {
        Pedido.buscarPedidos(req.session.usuario._id).then((pedidos) => {
            res.render("perfil", {
                pedidos: pedidos,
            });
        });

    } catch (err) {
        console.log(err);
        res.render("404");
    }


}
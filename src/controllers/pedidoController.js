const Pedido = require("../models/PedidoModel");

exports.index = (req, res) => {
    res.render("pedido");
}

exports.indexPost = async(req, res) => {
    const pedido = new Pedido(req.body, req.session.usuario);
    try{
        await pedido.registraPedidoBD();
        if(pedido.erros.length > 0){
            req.flash("erros", pedido.erros);
            req.session.save(() => {
                res.redirect("/pedido");
            });
            return;
        }
    }catch(err){
        console.log(err);
        res.render("404");
    }
    
    res.send(req.body);
}
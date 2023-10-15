const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
    nomeProjeto: { type: String, required: true },
    telefone: { type: String, required: true },
    descricao: { type: String },
    dataConclusao: { type: String, required: true },
    criadoPor: { type: String, required: true }
});

const PedidoModel = mongoose.model("Pedido", PedidoSchema);

class Pedido {
    constructor(body, usuario) {
        this.body = body;
        this.erros = [];
        this.usuario = usuario;
    };

    async registraPedidoBD() {
        this.valida();
        if (this.erros.length > 0) return;

        this.formataBody();
        if (this.erros.length > 0) return;

        await PedidoModel.create(this.body);
    };

    valida() {
        let dataAtual = new Date().toLocaleDateString();

        let dataBody = this.body.dataConclusao.replace(/-/g, "/");
        dataAtual = Pedido.inverteData(dataAtual);

        if (this.body.nomeProjeto.length < 5 || this.body.nomeProjeto.length > 30)
            this.erros.push("O nome do projeto deve ser entre 5 a 30 caracteres.");

        if (this.body.telefone.length < 8 || this.body.telefone.length > 11)
            this.erros.push("Número de telefone inválido.");

        if (this.body.telefone && !Number(this.body.telefone))
            this.erros.push("Número de telefone não pode conter letras.");

        if (this.body.descricao.length > 300)
            this.erros.push("A descrição deve conter no máximo 300 caracteres.");

        if (dataBody < dataAtual) this.erros.push("A data de conclusão não pode ser menor do que a data atual.");
    };

    formataBody() {
        this.body = {
            nomeProjeto: this.body.nomeProjeto,
            telefone: this.body.telefone,
            descricao: this.body.descricao,
            dataConclusao: this.body.dataConclusao,
            criadoPor: this.usuario._id
        };
    };

    static inverteData(data) {
        const dataArray = data.split("/");
        const novaData = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
        return novaData;
    };

    static async buscarPedidos(id) {
        const pedidos = await PedidoModel.find({ criadoPor: id });
        return pedidos;
    }

    static async validaPedidoUsuario(id, usuario) {
        const pedido = await PedidoModel.findById(id);
        if (!pedido) throw Error("Pedido não encontrado.");
        if (usuario._id !== pedido.criadoPor) throw Error("Acesso negado");

        return pedido;
    }

    async editarPedido(id) {
        this.valida();
        if (this.erros.length > 0) return;
        this.formataBody();
        await PedidoModel.findByIdAndUpdate(id, this.body, { new: true });
    };
}

module.exports = Pedido;

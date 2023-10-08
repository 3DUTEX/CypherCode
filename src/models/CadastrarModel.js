const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const CadastrarSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
});

const CadastrarModel = mongoose.model("Cadastrar", CadastrarSchema);

class Cadastrar {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async registraDB() {
        this.valida();
        if (this.erros > 0) return;

        await this.emailExiste();
        if (this.erros > 0) return;

        this.user = await CadastrarModel.create(this.body);
        console.log(this.user);
    }

    valida() {
        //validando
        if (this.body.usuario.length < 3 || this.body.usuario.length > 25) this.erros.push("O usuário deve conter entre 3 a 25 caracteres.")
        if (!(validator.isEmail(this.body.email))) this.erros.push("Informe um e-mail válido.");
        if (this.body.senha.length === 0) this.erros.push("A senha é obrigatória.")
        if (this.body.confirmarSenha !== this.body.senha) this.erros.push("As senhas devem ser iguais");

        this.criptSenha();
    }

    criptSenha() {
        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        //removendo o token e o confirmarSenha do this.body
        this.body = {
            usuario: this.body.usuario,
            email: this.body.email,
            senha: this.body.senha,
        }
    }

    async emailExiste() {
        const email = await CadastrarModel.findOne({ email: this.body.email });

        if (email) return this.erros.push("Um usuário já foi cadastrado com esse email.");
    }
}

module.exports = Cadastrar;
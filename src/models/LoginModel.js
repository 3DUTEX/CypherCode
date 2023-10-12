const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async registraDB() {
        await this.validaCadastro();
        if (this.erros.length > 0) return;

        this.criptSenha();

        this.user = await LoginModel.create(this.body);
    }

    async logarDB(){
        this.validaLogin();
        if(this.erros.length > 0) return;

        //procurando user no BD com o email inserido
        this.user = await LoginModel.findOne({ email:this.body.email });

        if(this.user){
            
            //se achar usuário, compara a senha inserida com a hash do BD
            if(!bcryptjs.compareSync(this.body.senha, this.user.senha)){
               this.erros.push("Senha inválida.");
               this.user = null;
               return;
            }
        }else{
            this.erros.push("Usuário Inexistente.");
            return;
        }
    }

    validaLogin(){
        if(!(validator.isEmail(this.body.email))) this.erros.push("Email inválido.");
        if(this.body.senha.length === 0) this.erros.push("Senha inválida.");

        //removendo token csrf
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        };
    }


    async validaCadastro() {
        //validando
        if (this.body.usuario.length < 3 || this.body.usuario.length > 25) this.erros.push("O usuário deve conter entre 3 a 25 caracteres.")
        if (!(validator.isEmail(this.body.email))) this.erros.push("Informe um e-mail válido.");
        if (this.body.senha.length === 0) this.erros.push("A senha é obrigatória.")
        if (this.body.confirmarSenha !== this.body.senha) this.erros.push("As senhas devem ser iguais");

        await this.emailExiste();
        if (this.erros > 0) return;
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
        const email = await LoginModel.findOne({ email: this.body.email });

        if (email) return this.erros.push("Um usuário já foi cadastrado com esse email.");
    }
}

module.exports = Login;

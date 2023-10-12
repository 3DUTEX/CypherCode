const nodemailer = require("nodemailer");
require("dotenv").config("../../.env");


class Email{
    constructor(){
        this.transporter = nodemailer.createTransport({
            //host do google
            host: "smtp.gmail.com",
            //porta padrão
            port: 587,
            secure: false,
      
            //conta
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
              rejectUnauthorized: false,
          }
      });
    }

              //enviando email de cadastro concluído
              async emailCadastrado(email, nomeUsu) {
                const mailSent = await this.transporter.sendMail({
                    text: "Cadastro concluído com sucesso!",
                    subject: "Cadastro Cypher Code",
                    from: "Suporte Cypher Code <cyphercodeetec@gmail.com>",
                    to: email,
                    html: `<h1>Cadastro concluído com sucesso!</h1>
                    <hr/>
                    <h2>Olá ${nomeUsu}!</h2><br />
                    Seja muito bem vindo a Cypher Code, a maior empresa DEV do Brasil.`
                });
            };
};

module.exports = Email;
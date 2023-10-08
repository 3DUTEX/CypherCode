//módulo utilziado para guardar varíaveis privadas(ex: conection strings);
require("dotenv").config("./.env");

const express = require("express");
const app = express();

//modela o schema da base de dados
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING)
  //após conectar, o app emite um evento chamado "DB Connected"
  .then(() => app.emit("DB Connected"))
  .catch((error) => console.log(error));

//serve para identicar o navegador do cliente e salvar um cookie
const session = require("express-session");

//MongoStore salva as sessões no banco de dados - por padrão salva as sessões na memória e quando estamos em produção se reiniciarmos os servidor
//a sessão morre, por isso deve-se salvar no banco de dados
const MongoStore = require("connect-mongo");

//flash messages são mensagens que perduram por 1 redirecionamento e depois morre e só funcionam em sessões
const flash = require("connect-flash");

//rotas da aplicação - em um arquivo separado
const routes = require("./routes.js");

//gerenciador de caminhos absoluto, sem barras (Ex: C:/desktop/aplicação(windows) media\dekstop\aplicacao(unbuntu))
const path = require("path");

//helmet - insere cabeçalhos HTTP que ajudam a aplicação a ser mais segura
const helmet = require("helmet");

//csrf - cria tokens nos formulários para impedir POSTS externos de formulários falsos fora do site
const csrf = require("csurf");

//são funções que executadas ao longo do redirecionamento das rotas, sendo utilizado para fazer alguma validacao no meio do caminho
//ex: o token do csrf é checkado por um middleware
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware.js");

//usando o Helmet
app.use(helmet());

//permite postagens de formulários na aplicação
app.use(express.urlencoded({ extended: true }));

//utilizado para conversão de dados em JSON
app.use(express.json());

//arquivos estáticos que devem ser acessados diretamente
app.use(express.static(path.resolve(__dirname, "public")));

//config de sessões
const sessionOptions = session({
  secret: "sfarwerrwfdfdwer",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

//caminho das views
app.set("views", path.resolve(__dirname, "src", "views"));

//engine que renderiza as views
app.set("view engine", "ejs");

//usando
app.use(sessionOptions);
app.use(flash());

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

//após o evento "DB Connected" acontecer, o servidor abre a porta
/* 
  Isso é importante pois a aplicação pode depender do banco de dados, ou seja
  para ela funcionar o banco de dados precisa estar conectado.
  Para isso acontecer, criamos um evento que é acionado somente quando o banco se conecta com a aplicação(sem erros)
  e abrimos a porta em seguida
*/
app.on("DB Connected", () => {
  const porta = 3000;
  app.listen(porta, () => {
    console.log("Servidor Funcionando: " + `http://localhost:${porta}`);
  });
});

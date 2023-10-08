const path = require("path"); //CommonJS

module.exports = {
  mode: "development",
  entry: "./frontend/main.js",

  //encontra o diretório - "_dirname = pasta do projeto", em seguida pastas onde está o diretória um seguido do outro
  output: {
    path: path.resolve(__dirname, "public", "assets", "js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  //"source-map = se acontecer algum erro no código, encontra no código fonte, pois podem ter dezenas de scripts em um arquivo bundle único"
  devtool: "source-map",
};

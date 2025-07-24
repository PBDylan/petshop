const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Importa o HtmlWebpackPlugin
const CopyPlugin = require("copy-webpack-plugin"); // Importa o CopyPlugin

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 6197, // Adicionamos a porta aqui, como conversamos
  },
  module: {
    rules: [
      // Regra para CSS:
      {
        test: /\.css$/, // Testa se o arquivo termina com .css
        use: ["style-loader", "css-loader"], // Usa style-loader e css-loader
      },
      // Você pode adicionar mais regras aqui para outros tipos de arquivos (imagens, etc.)
    ],
  },
  plugins: [
    // Plugin para gerar o HTML:
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Usa seu index.html da pasta src como template
      filename: "index.html", // O nome do arquivo HTML de saída na pasta dist
    }),
    // Plugin para copiar arquivos (ex: imagens, fontes) da src para a dist:
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets", noErrorOnMissing: true }],
    }),
  ],
};

const path = require("path"); // Importa o módulo 'path' do Node.js para lidar com caminhos de arquivo

module.exports = {
  // Define o modo do Webpack: 'development' para desenvolvimento, 'production' para produção
  mode: "development",

  // Ponto de entrada da sua aplicação (onde o Webpack começa a empacotar)
  entry: "./src/main.js", // Seu arquivo JavaScript principal

  // Onde o Webpack vai gerar os arquivos empacotados
  output: {
    filename: "bundle.js", // Nome do arquivo JavaScript final
    path: path.resolve(__dirname, "dist"), // Pasta de saída, usando 'dist'
    clean: true, // Limpa a pasta 'dist' antes de cada build
  },

  // Configurações para o servidor de desenvolvimento local
  devServer: {
    static: "./dist", // Serve os arquivos da pasta 'dist'
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
    hot: true, // Habilita o Hot Module Replacement (atualização sem recarregar a página)
    port: 8080, // Porta do servidor de desenvolvimento
  },

  // Regras para como o Webpack deve lidar com diferentes tipos de arquivos (loaders)
  module: {
    rules: [
      //Exemplo de regra para CSS (será adicionada depois)
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    // Exemplo de plugin para HTML (será adicionado depois)
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};

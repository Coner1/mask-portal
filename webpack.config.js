const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    module: {
        rules: [
            {
              test: /\.(s(a|c)ss)$/,
              use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", 'style-loader',],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
        new HtmlMinimizerPlugin({
            minimizerOptions: {
                collapseWhitespace: true, // Minify whitespace
                removeComments: true, // Remove comments
                removeRedundantAttributes: true, // Remove redundant attributes
                removeScriptTypeAttributes: true, // Remove script type attributes
                removeStyleLinkTypeAttributes: true, // Remove style link type attributes
                useShortDoctype: true, // Use short doctype
            },
        }),
        new CopyPlugin({
          patterns: [
            { from: "src/index.html", to: "index.html" }, // Example HTML file
            { from: "src/privacy.html", to: "privacy.html" },
            { from: "src/terms.html", to: "terms.html" },
            { from: "src/faq.html", to: "faq.html" },
            { from: "src/css", to: "css" },
            { from: "src/image", to: "image" },
          ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          // `...`,
          new CssMinimizerPlugin(),
          new HtmlMinimizerPlugin()
        ],
    },
};

module.exports = config;

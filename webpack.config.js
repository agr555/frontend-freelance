const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/app.js',
    mode:'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9002,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
        template: "./index.html"
    }),
        new CopyPlugin({
            patterns: [
                { from: "./src/static/images", to: "images" },
                { from: "./src/templates", to: "templates" },
                { from: "./node_modules/admin-lte/plugins/fontawesome-free/css/all.min.css", to: "css" },
                { from: "./node_modules/admin-lte/plugins/fontawesome-free/webfonts", to: "webfonts" },
                { from: "./node_modules/admin-lte/dist/css/adminlte.min.css", to: "css" },
                // { from: "./node_modules/admin-lte/dist/js/demo.js", to: "js" },
                { from: "./node_modules/admin-lte/dist/js/adminlte.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/jquery/jquery.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css", to: "css" },

                { from: "./node_modules/admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css", to: "css" },
                { from: "./node_modules/admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css", to: "css" },
                { from: "./node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css", to: "css" },
                { from: "./node_modules/admin-lte/plugins/select2/css/select2.min.css", to: "css" },
                { from: "./node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css", to: "css" },
                { from: "./node_modules/admin-lte/plugins/fullcalendar/main.css", to: "css/fullcalendar.css" },

                { from: "./node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/bs-custom-file-input/bs-custom-file-input.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/moment/moment.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/moment/locale/ru.js", to: "js/moment-ru-locale.js" },
                { from: "./node_modules/admin-lte/plugins/moment/locale/sk.js", to: "js/moment-sk-locale.js" },
                { from: "./node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/select2/js/select2.full.min.js", to: "js" },
                { from: "./node_modules/admin-lte/plugins/fullcalendar/main.js", to: "js/fullcalendar.js" },
                { from: "./node_modules/admin-lte/plugins/fullcalendar/locales/ru.js", to: "js/fullcalendar-locale-ru.js" },
                { from: "./node_modules/admin-lte/plugins/fullcalendar/locales/sk.js", to: "js/fullcalendar-locale-sk.js" },
                { from: "./node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js", to: "js/bootstrap.bundle.min.js" },
                { from: "./node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js.map", to: "js/bootstrap.bundle.min.js.map" },
                // { from: "./node_modules/admin-lte/dist/js/demo.js", to: "js/demo.js" },
                { from: "./.env", to: "./" }
            ],
        }),
    ],
};
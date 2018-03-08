const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-maps',
    entry: path.join(__dirname, 'index.js'),
    output: {
        filename: 'bundle.js',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.(t|j)s?$/,
                loader: 'ts-loader',
                include: [
                    path.resolve(__dirname, './src/'),
                    path.resolve(__dirname, '../src/'),
                ],
                options: {
                    transpileOnly: true,
                    configFile: path.join(__dirname, '../tsconfig.json'),
                    compilerOptions: {
                        target: 'es2015',
                        module: 'es2015',
                    },
                },
            },
            // {
            //     test: /\.(j|t)s$/,
            //     loader: 'minify-template-literal-loader',
            //     options: {
            //         caseSensitive: true,
            //         collapseWhitespace: true
            //     }
            // }
        ],
    },
    plugins: [new UglifyJsPlugin({ sourceMap: true })],
    devServer: {
        contentBase: __dirname,
    },
};

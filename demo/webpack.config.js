const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'source-maps',
    entry: './index.js',
    output: {
        filename: 'demo/public/bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', 'js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, '../src/')],
                options: {
                    transpileOnly: true,
                    configFile: path.join(__dirname, 'tsconfig.json')
                }
            }
            // {
            //     test: /\.(j|t)s$/,
            //     loader: 'minify-template-literal-loader',
            //     options: {
            //         caseSensitive: true,
            //         collapseWhitespace: true
            //     }
            // }
        ]
    },
    plugins: [new UglifyJsPlugin({ sourceMap: true })]
};

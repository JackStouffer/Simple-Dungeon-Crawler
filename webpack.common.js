const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: require.resolve('./src/globals.js'),
                loader: 'expose-loader',
                options: {
                    exposes: ['globals']
                }
            },
        ]
    }
};
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './script.js', // Ваш файл с исходным кодом
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Путь к папке сборки
    },
};

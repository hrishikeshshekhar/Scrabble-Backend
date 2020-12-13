module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
    },
    plugins: ['mongodb'],
    rules: {
        'no-underscore-dangle': 'off',
    },
}

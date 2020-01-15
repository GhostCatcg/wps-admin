module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    "extends": ["plugin:vue/base"],//  解决Parsing error: Unexpected token <
    "rules": {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',// 使用console.log功能
        "parser": "vue-eslint-parser"
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
}

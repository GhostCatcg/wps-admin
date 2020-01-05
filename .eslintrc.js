module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    "rules": {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',// 使用console.log功能
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
}

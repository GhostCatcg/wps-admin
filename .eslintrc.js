module.exports = {
    root: true,
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

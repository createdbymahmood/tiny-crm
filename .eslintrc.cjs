const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
    modules: {
        auto: true,
        esm: true,
        typescript: {
            parserProject: ['./tsconfig.eslint.json'],
            resolverProject: ['./tsconfig.json'],
        },
    },
    root: true,
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
});

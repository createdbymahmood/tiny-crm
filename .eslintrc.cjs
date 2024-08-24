const path = __dirname;
const resolvers = [`${path}/tsconfig.eslint.json`];

const {init} = require('@fullstacksjs/eslint-config/init');

module.exports = init({
    modules: {
        next: false,
        auto: true,
        esm: true,
        react: true,
        typescript: {
            parserProject: resolvers,
            resolverProject: resolvers,
        },
    },
    rules: {
        'import/no-cycle': 'off',
        'import/extensions': 'off',
    },
});

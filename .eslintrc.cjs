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
    rules: {
        'import/no-cycle': ['off'],
        'cypress/unsafe-to-chain-command': ['off'],
        'react/jsx-sort-props': [
            2,
            {
                callbacksLast: true,
                shorthandFirst: false,
                shorthandLast: true,
                ignoreCase: true,
                noSortAlphabetically: false,
                reservedFirst: [
                    'key',
                    'ref',
                    'children',
                    'dangerouslySetInnerHTML',
                ],
            },
        ],
    },
});

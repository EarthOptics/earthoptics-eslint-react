module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        'jest/globals': true,
    },
    overrides: [
        {
            files: [
                // TSX files are typically just a single function that returns a single JSX Element,
                // so don't go nuts like with `*.ts` files.
                '*.tsx',
            ],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 0,
                'jsdoc/require-param-description': 0, // should be typically defined in `Props` type
                'jsdoc/require-returns': 0,
            },
        },
        {
            files: ['*.md'],
            parser: 'eslint-plugin-markdownlint/parser',
            extends: ['plugin:markdownlint/recommended'],
        },
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2022, // allows for the parsing of modern ECMAScript features
        sourceType: 'module', // allows for the use of imports
        jsx: true,
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        ecmaFeatures: {
            jsx: true, // allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React
            version: 'detect',
        },
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules'],
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                ],
            },
        },
    },
    plugins: ['react'],
    extends: [
        'plugin:react/recommended',
        'airbnb/hooks',
        '@earth-optics/typescript',
    ],
    ignorePatterns: ['scratch'],
    rules: {
        // This section contains all the ultra-specific rules that are not covered by the configs,
        // or that are covered but we want to override. For consistency, use only the numeric value
        // instead of the word when describing severity: 0 = off | 1 = warn | 2 = error

        // -------------------------------------------------------------------------------------- \\
        // ****************************  BUILT-IN ESLINT RULES  ********************************* \\
        // -------------------------------------------------------------------------------------- \\

        // NOTE: some of these may conflict with Prettier (Prettier wins). There is a way to see
        // which rules conflict via CLI, but it didn't seem to be totally accurate so I'm leaving
        // them in. This one is weird, especially in `useEffect` cleanups. Try this if having
        // issues: https://stackoverflow.com/a/67658901/1048518
        'consistent-return': [2, { treatUndefinedAsUnspecified: false }],
        'max-len': [
            2,
            {
                code: 100,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreUrls: true,
                tabWidth: 2,
            },
        ],
        // -------------------------------------------------------------------------------------- \\
        // ****************************   RULES FROM PLUGINS   ********************************** \\
        // -------------------------------------------------------------------------------------- \\
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                labelComponents: [],
                labelAttributes: [],
                controlComponents: [],
                assert: 'either',
                depth: 25,
            },
        ],
        'no-relative-import-paths/no-relative-import-paths': [
            2,
            {
                allowSameFolder: true,
                rootDir: 'src',
            },
        ],
        'react/destructuring-assignment': 1,
        'react/function-component-definition': [2, { namedComponents: 'function-declaration' }],
        'react/jsx-boolean-value': 2,
        'react/jsx-filename-extension': [
            1,
            {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                ],
            },
        ],
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-no-bind': [2, { allowArrowFunctions: true, allowFunctions: true }],
        'react/jsx-no-useless-fragment': [
            2,
            {
                allowExpressions: true, // makes `<>{children}</>` valid, everyone is happy
            },
        ],
        'react/jsx-props-no-spreading': 0,
        'react/jsx-sort-props': [
            2,
            {
                callbacksLast: true,
                ignoreCase: true,
                multiline: 'last',
                shorthandFirst: true,
                reservedFirst: true,
            },
        ],
        'react/jsx-wrap-multilines': [0, { prop: 'parens-new-line' }],
        'react/no-danger': 0,
        'react/jsx-no-duplicate-props': [
            2,
            // Because MUI inputProps/InputProps
            { ignoreCase: false },
        ],
        'react/no-unescaped-entities': [2, { forbid: ['>', '}'] }],
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'react/require-default-props': 0, // useless, we aren't even using PropTypes
        'react/self-closing-comp': 2, // 💚 this one
        // "react/jsx-max-props-per-line": [2, {"maximum": { "single": 2, "multi": 1 }}],
        // ☝️ prettier 😢
    },
}

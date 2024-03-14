// NOTE: settled on a `.cjs` extension as it allows for JS usage (e.g. variables). A regular
// `.eslintrc.js` file did not work because of `type: 'module'` in package.json of the original
// project.

module.exports = {
    overrides: [], // directory or file-specific overrides
    plugins: [], // any additional plugins that should be applied (plugins provide rules)
    extends: [
        '@earth-optics/typescript-react',
        // any additional configs that should be applied. Order matters! Last one wins.
    ],
    ignorePatterns: [], // add any additional file or directory patterns that you want to ignore
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules'], // ℹ️ not sure if needed
                extensions: [
                    '.js',
                    '.ts',
                ],
            },
        },
    },
    // Adjust these if needed, not really sure how portable this is
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2022, // allows for the parsing of modern ECMAScript features
        sourceType: 'module', // allows for the use of imports
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
        },
    },
    rules: {
        // This section contains all the ultra-specific rules that are not covered by the configs,
        // or that are covered but we want to override. For consistency, use only the numeric value
        // instead of the word when describing severity: 0 = off | 1 = warn | 2 = error
        // -------------------------------------------------------------------------------------- \\
        // **************************  BUILT-IN ESLINT RULES  *********************************** \\
        // -------------------------------------------------------------------------------------- \\
        // NOTE: some of these may conflict with Prettier (Prettier wins). There is a way to see
        // which rules conflict via CLI, but it didn't seem to be totally accurate so I'm leaving
        // them in.
        // -------------------------------------------------------------------------------------- \\
        // ****************************  RULES FROM PLUGINS  ************************************ \\
        // -------------------------------------------------------------------------------------- \\
    },
}

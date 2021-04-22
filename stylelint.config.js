module.exports = {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
            }
        ],
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
        ignoreFiles: ['./styles/Home.module.css', './styles/globals.css'],
        indentation: 4,
        'number-leading-zero': null
    }
};

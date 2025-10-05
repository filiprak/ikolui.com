import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        files: ['**/*.{ts,js,vue}'],
        rules: {
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'always-multiline']
        }
    },
    {
        files: ['**/*.vue'],
        rules: {
            'vue/first-attribute-linebreak': 'off',
            'vue/multi-word-component-names': 'off',
        }
    },
);

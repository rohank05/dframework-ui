import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser // Enable browser globals like `window`, `document`
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true // Enable JSX parsing
                }
            }
        },
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
            import: pluginImport
        },
        settings: {
            react: {
                version: 'detect' // Automatically detect React version
            }
        },
        rules: {
            // General best practices
            'no-var': 'error',
            'no-unused-vars': 'error',
            'prefer-const': 'error',
            'eqeqeq': 'error',
            'no-case-declarations': 'off',
            // Formatting
            'semi': ['error', 'always'],                 // Require semicolons
            'comma-dangle': ['error', 'never'],          // Disallow trailing commas

            // React-specific rules
            'react/jsx-uses-react': 'on', // Not needed in React 17+
            'react/react-in-jsx-scope': 'on', // Not needed in React 17+
            'react/jsx-uses-vars': 'error',
            'no-undef': ['error', { 'typeof': true}],

            // Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Import rules
            'import/first': 'error'
        },
        ignores: ['node_modules/', 'build/', 'dist/']
    }
];

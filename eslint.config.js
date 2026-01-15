const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      // --- General Best Practices ---
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off', // Usually 'off' in Node so you can see logs
      eqeqeq: ['error', 'always'], // Use === instead of ==
      curly: 'error', // Force {} for if/else blocks

      // --- Node.js & Async specific ---
      'no-process-exit': 'error', // Prevent sudden app crashes
      'handle-callback-err': 'error', // Ensure errors in callbacks are handled
      'no-return-await': 'warn', // Prevent unnecessary 'await' on return values
      'no-path-concat': 'error', // Force path.join() instead of __dirname + '/file'

      // --- Formatting/Style (to keep code clean) ---
      semi: ['error', 'always'], // Enforce semicolons
      indent: ['error', 2], // 2-space indentation
      'comma-dangle': ['error', 'always-multiline'], // Better for git diffs
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-multi-spaces': 'error',
    },
  },
];

module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Temporarily disable no-unused-vars for development
    'no-unused-vars': 'warn',
    // Disable exhaustive-deps warnings for development
    'react-hooks/exhaustive-deps': 'warn',
    // Allow console statements in development
    'no-console': 'warn'
  },
  overrides: [
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      rules: {
        // Less strict for development components
        'no-unused-vars': ['warn', { 
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_' 
        }]
      }
    }
  ]
};
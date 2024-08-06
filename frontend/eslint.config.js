// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  lessOpinionated: true,

  stylistic: {
    overrides: {
      'curly': ['error', 'multi-line', 'consistent'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    },
  },

  javascript: {
    overrides: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
})

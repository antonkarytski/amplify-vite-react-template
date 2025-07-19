//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'sort-imports': 'off',
      'import/ order': 'off',
      'no-unused-vars': 'off',
    },
  },
]

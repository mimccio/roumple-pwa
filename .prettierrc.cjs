module.exports = {
  printWidth: 120,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  importOrder: [
    '<TYPES>',
    '^react$',
    '^react-router-dom$',
    '^react-i18next$',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^@heroicons(/.*)$',
    '',
    '^@/db$',
    '^@/assets(/.*)?$',
    '<TYPES>^@/common(/.*)?$',
    '^@/common/constants(/.*)?$',
    '^@/common/utils(/.*)?$',
    '^@/common/hooks(/.*)?$',
    '^@/common/components(/.*)?$',
    '^@/common(/.*)$',
    '<TYPES>^@/modules(/.*)$',
    '^@/modules/*/types(/.*)?$',
    '^@/modules/*/constants(/.*)?$',
    '^@/modules/*/atoms(/.*)?$',
    '^@/modules/*/utils(/.*)?$',
    '^@/modules/*/hooks(/.*)?$',
    '^@/modules/*/components(/.*)?$',
    '^@/modules(/.*)$',
    '^@/screens(/.*)$',
    '<TYPES>^@/.*$',
    '^@/.*$',
    '<TYPES>^[.]',
    '^[.]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
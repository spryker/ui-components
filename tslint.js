module.exports = {
  rulesDirectory: ['node_modules/@nrwl/workspace/src/tslint', 'codelyzer'],
  rules: {
    align: {
      options: ['parameters', 'statements'],
    },
    'arrow-return-shorthand': true,
    'callable-types': true,
    'class-name': true,
    curly: true,
    deprecation: {
      severity: 'warn',
    },
    eofline: true,
    forin: true,
    'import-blacklist': [true, 'rxjs/Rx'],
    'import-spacing': true,
    indent: {
      options: ['spaces'],
    },
    'interface-over-type-literal': true,
    'member-access': false,
    'member-ordering': [
      true,
      {
        order: [
          'static-field',
          'instance-field',
          'static-method',
          'instance-method',
        ],
      },
    ],
    'no-arg': true,
    'no-bitwise': true,
    'no-console': [true, 'debug', 'info', 'time', 'timeEnd', 'trace'],
    'no-construct': true,
    'no-debugger': true,
    'no-duplicate-super': true,
    'no-empty': false,
    'no-empty-interface': true,
    'no-eval': true,
    'no-inferrable-types': [true, 'ignore-params'],
    'no-misused-new': true,
    'no-non-null-assertion': true,
    'no-shadowed-variable': true,
    'no-string-literal': false,
    'no-string-throw': true,
    'no-switch-case-fall-through': true,
    'no-unnecessary-initializer': true,
    'no-unused-expression': true,
    'no-var-keyword': true,
    'object-literal-sort-keys': false,
    'prefer-const': true,
    radix: true,
    'space-before-function-paren': {
      options: {
        anonymous: 'never',
        asyncArrow: 'always',
        constructor: 'never',
        method: 'never',
        named: 'never',
      },
    },
    'triple-equals': [true, 'allow-null-check'],
    'typedef-whitespace': {
      options: [
        {
          'call-signature': 'nospace',
          'index-signature': 'nospace',
          parameter: 'nospace',
          'property-declaration': 'nospace',
          'variable-declaration': 'nospace',
        },
        {
          'call-signature': 'onespace',
          'index-signature': 'onespace',
          parameter: 'onespace',
          'property-declaration': 'onespace',
          'variable-declaration': 'onespace',
        },
      ],
    },
    'unified-signatures': true,
    'variable-name': false,

    // TODO: Disabled because it fails even with header being present in files
    // Also there is no header currently defined
    // 'file-header': [
    //   true,
    //   {
    //     match: escapeRegex(require('./config/LICENSE_HEADER')),
    //     default: require('./config/LICENSE_HEADER'),
    //     'enforce-trailing-newline': true
    //   }
    // ],

    'directive-selector': [true, 'attribute', 'spy', 'camelCase'],
    'component-selector': [true, 'element', 'spy', 'kebab-case'],

    'nx-enforce-module-boundaries': [
      true,
      {
        allow: [],
        depConstraints: [
          // type rules START
          {
            sourceTag: 'type:meta',
            onlyDependOnLibsWithTags: ['type:meta', 'type:util'],
          },
          { sourceTag: 'type:util', onlyDependOnLibsWithTags: ['type:util'] },
          { sourceTag: 'type:style', onlyDependOnLibsWithTags: ['type:style'] },
          {
            sourceTag: 'type:service',
            onlyDependOnLibsWithTags: [
              'type:util',
              'type:service',
              'type:component-service',
            ],
          },
          {
            sourceTag: 'type:component',
            onlyDependOnLibsWithTags: [
              'type:util',
              'type:service',
              'type:component',
              'type:component-service',
            ],
          },
          {
            sourceTag: 'type:component-service',
            onlyDependOnLibsWithTags: [
              'type:util',
              'type:service',
              'type:component',
              'type:component-service',
            ],
          },
          // type rules END
          // level rules START
          // TODO: Enable level rules once it's behavior is fixed
          // { sourceTag: 'level:atom', onlyDependOnLibsWithTags: ['level:atom'] },
          // {
          //   sourceTag: 'level:molecule',
          //   onlyDependOnLibsWithTags: ['level:atom', 'level:molecule'],
          // },
          // {
          //   sourceTag: 'level:organism',
          //   onlyDependOnLibsWithTags: [
          //     'level:atom',
          //     'level:molecule',
          //     'level:organism',
          //   ],
          // },
          // {
          //   sourceTag: 'level:template',
          //   onlyDependOnLibsWithTags: [
          //     'level:atom',
          //     'level:molecule',
          //     'level:organism',
          //     'level:template',
          //   ],
          // },
          // {
          //   sourceTag: 'level:page',
          //   onlyDependOnLibsWithTags: [
          //     'level:atom',
          //     'level:molecule',
          //     'level:organism',
          //     'level:template',
          //     'level:page',
          //   ],
          // },
          // level rules END
          { sourceTag: '*', onlyDependOnLibsWithTags: ['*'] },
        ],
        enforceBuildableLibDependency: true,
      },
    ],
    whitespace: {
      options: [
        'check-branch',
        // 'check-decl',
        'check-operator',
        'check-separator',
        'check-type',
        'check-typecast',
      ],
    },
  },
};

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

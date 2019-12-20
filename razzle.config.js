const TRANSFORMS_FOR_IE11 = {
  test: /\.jsx?$/,
  include: new RegExp(
      `node_modules/(?=(${[
        // ref: https://github.com/styleguidist/react-styleguidist/pull/1327
        'acorn-jsx',
        'estree-walker',
        'regexpu-core',
        'unicode-match-property-ecmascript',
        'unicode-match-property-value-ecmascript',
        'react-dev-utils',
        'ansi-styles',
        'ansi-regex',
        'chalk',
        'strip-ansi'
      ].join('|')})/).*`
  ),
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              ie: '11'
            }
          }
        ]
      ]
    }
  }
};

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    config.module.rules = [
      TRANSFORMS_FOR_IE11,
      ...config.module.rules
    ];

    return config;
  },
  plugins: [
    {
      name: 'typescript',
      options: {
        useBabel: true,
        useEslint: true,
        forkTsChecker: {
          tsconfig: './tsconfig.json',
          tslint: undefined,
          watch: './src',
          typeCheck: true,
        },
      },
    },
  ],
};

module.exports = {
  env: {
    es6      : true,
    node     : true,
    mocha    : true,
  },
  plugins: [
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion  : 2017,
    sourceType   : 'module',
    ecmaFeatures : {
      experimentalObjectRestSpread : true,
    }
  },
  settings: {
    'import/resolver': {
      node: {
        paths      : [
          'src',
          'test',
        ],
        extensions : [
          '.js',
          '.jsx',
        ],
      },
    },
  },
}

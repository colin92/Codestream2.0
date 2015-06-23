var configs = {};
configs.production = {
  dbName: 'codestream2',
  google: {
    key: '',
    id: '',
    callbackURL: 'http://app.codestream.co/auth/google/return',
    realm: 'http://app.codestream.co/'
  },
  test: {
    dbURI: 'mongodb://localhost:27017/codestream2-test'
  }
};

configs.development = {
  dbName: 'codestream2-dev',
  google: {
    key: '',
    id: '',
    callbackURL: 'http://localhost:4545/auth/google/return',
    realm: 'http://localhost:4545/'
  },
  test: {
    dbURI: 'mongodb://localhost:27017/codestream2-test'
  }
};


module.exports = configs[process.env.NODE_ENV];

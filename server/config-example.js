var configs = {};
configs.production = {
  dbName: 'codestream2',
  google: {
    secret_key: '',
    token: '',
  }
};

configs.development = {
  dbName: 'codestream2-dev',
  google: {
    secret_key: '',
    token: ''
  }
};


module.exports = configs[process.env.NODE_ENV];

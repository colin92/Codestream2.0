module.exports = {
  dbName: process.env.DB_URI,
  google: {
    secret_key: process.env.GOOGLE_CLIENT_SECRET,
    token: process.env.GOOGLE_CLIENT_ID,
    callbackURL: 'http://localhost:4545/auth/google/return',
    realm: 'http://localhost:4545/'
  },
  test: {
    dbURI: 'mongodb://localhost:27017/codestream2-test'
  }
};



module.exports = {
  dbName: process.env.DB_URI,
  google: {
    key: process.env.GOOGLE_CLIENT_SECRET,
    id: process.env.GOOGLE_CLIENT_ID,
    callbackURL: 'http://localhost:4545/auth/google/return',
    realm: 'http://localhost:4545/'
  },
  test: {
    dbURI: 'mongodb://localhost:27017/codestream2-test'
  }
};



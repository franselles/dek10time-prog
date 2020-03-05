module.exports = {
  port: process.env.PORT || 8080,
  db:
    process.env.MONGODB_URI ||
    'mongodb://f54n:Uzituxez1800@ds137435.mlab.com:37435/successfully'
};

// 'mongodb://f54n:Uzituxez1800@ds137435.mlab.com:37435/successfully'
// process.env.MONGODB_URI
// 'mongodb://localhost/successfully'

// mongodb+srv://dbF54n:Uzituxez1800@cluster0-hwqzr.mongodb.net/successfully

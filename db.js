
const mongoose = require('mongoose');

const {name, username, password, host, port} = {
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}
const MONGO_URI = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`

exports.connect = () => {
  mongoose.connect(MONGO_URI).then(() => {
    console.log('Database connection successful')
  }).catch(err => {
    console.log(err)
    console.error('Database connection error')
  })
}

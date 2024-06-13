const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  surname: String,
  emailForNotification: String,
  location: String,
  mail: String,
  notificationType: String,
  phoneNumber: String,
  premium: Boolean,
  password: String,
});

let userModel = mongoose.model('user', userSchema);

module.exports = userModel;

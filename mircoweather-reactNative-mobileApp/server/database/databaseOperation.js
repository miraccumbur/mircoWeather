import mongoose from 'mongoose';
import {MONGODB_KEY} from '@env';

const connectDb = () => {
  mongoose.connect(MONGODB_KEY, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  console.log('basarili');
};
module.exports = connectDb;

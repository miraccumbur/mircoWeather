const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citiesSchema = new Schema({
  name: String,
  information: {
    imageSize: String,
    licensePlate: String,
  },
  location: {
    latitude: String,
    longitude: String,
  },
  radarArea: {
    areaName: String,
    areaSize: {
      heightTop: Number,
      heightBottom: Number,
      widthLeft: Number,
      widthRight: Number,
    },
  },
});

let citiesModel = mongoose.model('cities', citiesSchema);

module.exports = citiesModel;

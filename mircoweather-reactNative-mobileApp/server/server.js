const express = require('express');
require('dotenv').config();
const {hash, compare} = require('./hashing/hashingOperation');
const userModel = require('./database/schemas/userSchema');
const citiesModel = require('./database/schemas/citiesSchema');
const weatherModel = require('./database/schemas/weatherSchema');
const magicString = require('./magicString');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL.toString(), {
  useNewUrlParser: true,
});

app.get('/', (req, res) => {
  res.send('hello world, bu denemedir.');
});

app.post('/api/createUser', async (req, res) => {
  const data = req.body;
  try {
    const isMailUsable = await new Promise((resolve, reject) => {
      userModel.find({mail: data.mail}, (err, users) => {
        if (err) throw err;
        if (users.length > 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    const hashedPassword = await hash(data.password);

    if (isMailUsable) {
      userModel.create({
        name: data.name,
        surname: data.surname,
        mail: data.mail,
        password: hashedPassword,
      });
    } else {
      throw magicString.MAIL_ALREADY_EXISTS;
    }
    res.json({
      code: 200,
      message: 'success',
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const data = req.body;
    const userData = await new Promise((resolve, reject) => {
      userModel.findOne({mail: data.mail}, (err, data) => {
        if (err) throw err;
        resolve(data);
      });
    });
    if (userData === null) {
      throw magicString.USER_DOESNT_EXISTS;
    }

    const IsPasswordMatching = await compare(data.password, userData.password);
    if (IsPasswordMatching) {
      res.json({
        code: 200,
        message: 'success',
        user: {
          name: userData.name,
          surname: userData.surname,
          mail: userData.mail,
          _id: userData._id,
        },
      });
    } else {
      throw magicString.WRONG_PASSWORD;
    }
  } catch (error) {
    res.json({code: 400, message: error});
  }
});

app.post('/api/changeInformation', async (req, res) => {
  try {
    const data = req.body;
    const updateDataValue = {
      emailForNotification: data.notificationMail,
      phoneNumber: data.notificationPhoneNumber,
      notificationType: data.notificationType,
    };
    const userData = await new Promise((resolve, reject) => {
      userModel.findByIdAndUpdate(
        data.user._id,
        updateDataValue,
        {upsert: false, new: true},
        (error, data) => {
          if (error) throw error;
          if (data === null) throw magicString.USER_DOESNT_EXISTS;
          resolve(data);
        },
      );
    });

    res.json({
      code: 200,
      message: 'success',
      data: userData,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
});

app.post('/api/changeLocation', async (req, res) => {
  try {
    const data = req.body;
    const updateDataValue = {
      location: data.city,
    };
    const userData = await new Promise((resolve, reject) => {
      userModel.findByIdAndUpdate(
        data.user._id,
        updateDataValue,
        {upsert: false, new: true},
        (error, data) => {
          if (error) throw error;
          if (data === null) throw magicString.USER_DOESNT_EXISTS;
          resolve(data);
        },
      );
    });

    res.json({
      code: 200,
      message: 'success',
      data: userData,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
});

app.post('/api/changePassword', async (req, res) => {
  try {
    const data = req.body;
    const userData = await new Promise((resolve, reject) => {
      userModel.findById(data.user._id, (error, data) => {
        if (error) throw error;
        resolve(data);
      });
    });
    if (userData === null) throw magicString.USER_DOESNT_EXISTS;

    const isPasswordMatching = await compare(
      data.currentPassword,
      userData.password,
    );

    const updateDataValue = {
      password: await hash(data.newPassword),
    };

    if (isPasswordMatching) {
      const userAfterUpdate = await new Promise((resolve, reject) => {
        userModel.findByIdAndUpdate(
          data.user._id,
          updateDataValue,
          {upsert: false, new: true},
          (error, data) => {
            if (error) throw error;
            resolve(data);
          },
        );
      });

      res.json({
        code: 200,
        message: 'success',
        data: userAfterUpdate,
      });
    } else {
      throw magicString.WRONG_PASSWORD;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
});

app.get('/api/getCities', async (req, res) => {
  try {
    const citiesData = await new Promise((resolve, reject) => {
      citiesModel.find({}, (error, data) => {
        if (error) throw error;
        resolve(data);
      });
    });

    const citiesList = [];
    await citiesData.forEach(city => {
      citiesList.push(city.name);
    });
    return res.json({code: 200, data: citiesList});
  } catch (error) {
    res.json({code: 400, message: error});
  }
});

app.get('/api/getWeather/city=:city', async (req, res) => {
  try {
    const weatherData = await new Promise((resolve, reject) => {
      weatherModel.findOne({name: req.params.city}, (error, data) => {
        if (error) throw error;
        resolve(data);
      });
    });
    res.json({code: 200, data: weatherData});
  } catch (error) {
    res.json({code: 400, message: error});
  }
});

app.listen(process.env.PORT);

const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = async plainText => {
  const returningHashedText = await new Promise((resolve, reject) => {
    bcrypt.hash(plainText, saltRounds, function (err, hashedText) {
      if (err) {
        console.log(err);
      }
      // console.log(hashedText);
      resolve(hashedText);
    });
  });
  return returningHashedText;
};

const compare = async (plainText, hashingText) => {
  const compareResult = await new Promise((resolve, reject) => {
    bcrypt.compare(plainText, hashingText, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
  return compareResult;
};

module.exports = {
  hash,
  compare,
};

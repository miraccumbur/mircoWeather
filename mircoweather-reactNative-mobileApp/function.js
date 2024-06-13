const mailValidate = text => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(text);
};

const turkishToEnglish = text => {
  return text
    .replace('Ğ', 'G')
    .replace('Ü', 'U')
    .replace('Ş', 'S')
    .replace('I', 'I')
    .replace('İ', 'I')
    .replace('Ö', 'O')
    .replace('Ç', 'C')
    .replace('ğ', 'g')
    .replace('ü', 'u')
    .replace('ş', 's')
    .replace('ı', 'i')
    .replace('ö', 'o')
    .replace('ç', 'c');
};

module.exports = {
  mailValidate,
  turkishToEnglish,
};

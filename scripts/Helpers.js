const fs = require('fs');
const https = require('https');

exports.randomTag = function randomTag(length) {
  let result = '';
  const characters = 'abcdefghjklmnpqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.downloadToMemory = function downloadToMemory(url) {
  console.log(url);
  let fileName = url.split('/');
  fileName = fileName[fileName.length - 1];
  const file = fs.createWriteStream(`memory/attachments/${this.randomTag(5)}-${fileName}`);
  https.get(url, (response) => {
    response.pipe(file);
  });
};

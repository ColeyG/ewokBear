import fs from 'fs';
import https from 'https';

export const randomTag = function randomTag(length) {
  let result = '';
  const characters = 'abcdefghjklmnpqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const downloadToMemory = function downloadToMemory(url) {
  console.log(url);
  let fileName = url.split('/');
  fileName = fileName[fileName.length - 1];
  const file = fs.createWriteStream(`memory/attachments/${randomTag(5)}-${fileName}`.toLowerCase());
  https.get(url, (response) => {
    response.pipe(file);
  });
};

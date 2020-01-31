const fs = require('fs');
const record = require('../memory/record.json');

exports.botDiscipline = function botDiscipline(resp) {
  function write() {
    fs.writeFile('memory/record.json', JSON.stringify(record), 'utf8', (err) => {
      if (err) { console.log(err); }
    });
  }

  if (resp === 'good') {
    record.goods++;
    record.total++;
    write();
  } else if (resp === 'bad') {
    record.bads++;
    record.total++;
    write();
  }
};

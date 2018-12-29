const fs = require('fs');
let record = require('../memory/record.json');

exports.botDiscipline = function botDiscipline(resp){

    function write(){
        fs.writeFile('memory/record.json',JSON.stringify(record),'utf8', function(err){
            if(err){console.log(err);}
        });
    }

    if(resp=='good'){
        record.goods++;
        record.total++;
        write();
    }else if(resp=='bad'){
        record.bads++;
        record.total++;
        write();
    }
}
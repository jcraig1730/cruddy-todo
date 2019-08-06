const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');


// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err, data) => {
      if (err){
        console.log(err)
      } else {
        callback(null, { id, text });
        // ????????
      }
    })
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files)=>{
    files = files.map((name) => ({id: name, text: name}));
    callback(err, files);
  })
};

exports.readOne = (id, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, data) => {
    const fileRead = {id, text: data}
    callback(err, fileRead);
  })
};

exports.update = (id, text, callback) => {
  fs.readdir(exports.dataDir, (err, files)=>{
    if (!files.includes( `${id}.txt`)){
        callback('The id does not exist.');
    }else{
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err, data) => {
        callback(err, data);
      })
    }
  });
}


exports.delete = (id, callback) => {
  fs.unlink(`${exports.dataDir}/${id}.txt`, (err, data) =>{
    if (err){
      callback('The id does not exist.')
    } else {
      callback(err, data);
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');

function readData() {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/data.csv', (err, data) => {
      parse(data, (err, data) => {
        if(err) return reject(err);
        resolve(data)
      })
    })
  })
  return promise;
}

function Books() {
  return knex('books');
}

function Authors() {
  return knex('authors');
}

function Join() {
  return knex('join');
}

readData().then((data) => {
  console.log(data);
})

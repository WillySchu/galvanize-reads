'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');
const Promise = require('bluebird');
const knex = require('./db/knex')

function readData() {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/data.csv', (err, data) => {
      parse(data, (err, data) => {
        if(err) return reject(err);
        resolve(data)
      });
    });
  });
  return promise;
}

function Books() {
  return knex('books');
}

function Authors() {
  return knex('authors');
}

function JoinTable() {
  return knex('jointable');
}

function Users() {
  return knex('users');
}

function loadAuthors(data) {
  const pauthors = [];
  const authorsSeen = [];
  for (let i = 1; i < data.length; i++) {
    if(data[i][5].trim() && authorsSeen.indexOf(data[i][5]) === -1) {
      authorsSeen.push(data[i][5]);
      pauthors.push(Authors().insert({first_name: data[i][5], last_name: data[i][6], biography: data[i][7], portrait_url: data[i][8]}, '*'));
    }
    if(data[i][9].trim() && authorsSeen.indexOf(data[i][9]) === -1) {
      authorsSeen.push(data[i][9]);
      pauthors.push(Authors().insert({first_name: data[i][9], last_name: data[i][10], biography: data[i][11], portrait_url: data[i][12]}, '*'))
    }
    if (data[i][13].trim() && authorsSeen.indexOf(data[i][13]) === -1) {
      authorsSeen.push(data[i][13]);
      pauthors.push(Authors().insert({first_name: data[i][13], last_name: data[i][14], biography: data[i][15], portrait_url: data[i][16]}, '*'))
    }
  }
  return Promise.all(pauthors);
}

function loadBooks(data) {
  const pbooks = [];
  for (let i = 1; i < data.length; i++) {
    let author1 = data[i][5] + ' ' + data[i][6];
    let author2 = data[i][9] + ' ' + data[i][10];
    let author3 = data[i][13] + ' ' + data[i][14];
    let title = data[i][1];
    let genre = data[i][2];
    let description = data[i][3];
    let cover_url = data[i][4];
    pbooks.push(Books().insert({author1, author2, author3, title, genre, description, cover_url}));
  }
  return Promise.all(pbooks);
}

function getJoinData() {
  const promise = new Promise((resolve, reject) => {
    const fullNames = [];
    const authorIDs = [];
    const bookIDs = [];

    return Authors().select('id', 'first_name', 'last_name').then((names) => {
      for (let i = 0; i < names.length; i++) {
        fullNames.push(names[i].first_name + ' ' + names[i].last_name);
        authorIDs.push(names[i].id);
      }
      for (let i = 0; i < fullNames.length; i++) {
        Books().select('id', 'title').where({author1: fullNames[i]}).orWhere({author2: fullNames[i]}).orWhere({author3: fullNames[i]}).then((book) => {
          for (let j = 0; j < book.length; j++) {
            bookIDs.push({bookId: book[j].id, authId: authorIDs[i]})
          }
          if (i === fullNames.length - 1) {
            resolve(bookIDs);
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }).catch(err => {
      console.log(err);
    });
  });
  return promise;
}

function loadJoinTable() {
  const pjoin = [];
  return getJoinData().then((data) => {
    for (var i = 0; i < data.length; i++) {
      pjoin.push(JoinTable().insert({author_id: data[i].authId, book_id: data[i].bookId}))
    }
    return Promise.all(pjoin);
  });
}

function loadUser() {
  return Users().insert({name: "Will", email: "willjschumacher@gmail.com", thumb_url: "http://goo.gl/aeRNev", password_digest: "$2a$10$hlFTCIYNkuv/DORm22gGeOR0F.NyMzjKj.19kkwv/X8oezQgRlkBS", is_admin: "t"}).then(data => {
    return data
  }).catch(err => {
    return console.log(err);
  });
}

function loadUp(data) {
  return Promise.join(loadAuthors(data).then(d => {
    console.log('authors');
  }).catch(e => {
    console.log('authors error');
    console.log(e);
  }),
  loadBooks(data).then(d => {
    console.log('books');
  }).catch(e => {
    console.log('books error');
    console.log(e);
  }),
  loadUser()).then(() => {
    console.log('user');
    return loadJoinTable().then(d => {
      console.log('join');
    }).catch(e => {
      console.log('join error');
      console.log(e);
    })
  }).catch(() => {
    console.log('broken');
  });
}

// readData().then((data) => {
//   return loadUp(data).then((e) => {
//     process.exit();
//   }).catch((e) => {
//     console.log('also broken');
//   });
// });

module.exports = function start() {
  return readData().then((data) => {
    return loadUp(data);
  });
}

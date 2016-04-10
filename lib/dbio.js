const knex = require('../db/knex');

module.exports = {
  getAuthors: () => {
    return Authors();
  },
  getAuthor: (authID) => {
    return Authors().where({id: authID}).first()
  },
  getAuthorsByBook: (bookID) => {
    //some code
  },
  insertBook: (newBook) => {
    return Books().insert({author1: newBook.author1, author2: newBook.author2, author3: newBook.author3, title: newBook.title, genre: newBook.genre, descrition: newBook.description, cover_url: newBook. coverUrl}, '*');
  },
  getBooks: () => {
    return Books();
  },
  getBook: (bookId) => {
    return Books().where({id: bookId}).first();
  },
  getBooksByAuthor: (authorID) => {
    // some code
  },
  insertAuthor: (newAuthor) => {
    return Authors().insert({first_name: newAuthor.firstName, last_name: newAuthor.lastName, portrait_url: newAuthor.portraitUrl, biography: newAuthor.biography}, '*');
  }
}

function Authors() {
  return knex('authors');
}

function Books() {
  return knex('books');
}

function Join() {
  return knex('join');
}

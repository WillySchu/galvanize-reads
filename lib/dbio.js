const knex = require('../db/knex');

module.exports = {
  getAuthors: () => {
    return Authors();
  },
  getAuthor: (authID) => {
    return Authors().where({id: authID}).first();
  },
  getAuthorIDs: () => {
    return Authors().pluck('id');
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
    return Authors().where({id: authorId}).first().then((author) => {
      return Join().pluck('id').where({author_id: authorId}).then((ids) => {
        return Books().whereIn({id: ids})
      });
    });
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

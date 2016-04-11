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
    return Books().insert({author1: newBook.author1, author2: newBook.author2, author3: newBook.author3, title: newBook.title, genre: newBook.genre, description: newBook.description, cover_url: newBook. cover_url}, 'id').then(bid => {
      console.log(bid[0]);
      console.log(typeof bid[0]);
      const firstName1 = newBook.author1.split(' ')[0];
      const lastName1 = newBook.author1.split(' ')[1];
      Authors().pluck('id').where({first_name: firstName1}).where({last_name: lastName1}).first().then((aid) => {
        console.log(aid.id);
        Join().insert({author_id: aid.id, book_id: bid[0]}).then(() =>{
        });
      });
    });
  },
  getBooks: () => {
    return Books();
  },
  getBookAndAuthId: (bookId) => {
    return Books().where({id: bookId}).first().then((book) => {
      return Join().pluck('author_id').where({book_id: book.id}).then((aids) => {
        for (var i = 0; i < aids.length; i++) {
          var author = 'author' + (i + 1) + '_id';
          book[author] = aids[i]
        }
        return book;
      });
    });
  },
  getBooksAndAuthIds: () => {
    return module.exports.getBookIDs().then((ids) => {
      const promises = ids.map(module.exports.getBookAndAuthId);
      return promises;
    });
  },
  getBook: (bookId) => {
    return Books().where({id: bookId}).first();
  },
  getBookIDs: () => {
    return Books().pluck('id')
  },
  getBooksByAuthor: (authorId) => {
    return Authors().where({id: authorId}).first().then((author) => {
      return Join().pluck('book_id').where({author_id: authorId}).then((ids) => {
        return Books().whereIn('id', ids).then((books) => {
          return {author, books};
        })
      });
    });
  },
  getBooksForAllAuthors: () => {
    return module.exports.getAuthorIDs().then((ids) => {
      const promises = ids.map(module.exports.getBooksByAuthor);
      return promises;
    });
  },
  insertAuthor: (newAuthor) => {
    return Authors().insert({first_name: newAuthor.first_name, last_name: newAuthor.last_name, portrait_url: newAuthor.portrait_url, biography: newAuthor.biography}, '*');
  }
}

function Authors() {
  return knex('authors');
}

function Books() {
  return knex('books');
}

function Join() {
  return knex('jointable');
}

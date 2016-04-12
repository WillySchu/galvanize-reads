const db = require('./dbio');

module.exports = function(req, res, next) {
  res.locals.user = req.session.user
  db.getBooksAndAuthIds().then((pbooks) => {
    Promise.all(pbooks).then((books) => {
      res.locals.books = books;
    });
    db.getAuthors().then((authors) => {
      res.locals.authors = authors;
      db.getBooksForAllAuthors().then((promises) => {
        Promise.all(promises).then((data) => {
          res.locals.authorbooks = data;
          db.getGenres().then(genres => {
            res.locals.genres = genres;
            next();
          });
        });
      });
    });
  });
}

const db = require('./dbio');

module.exports = function(req, res, next) {
  const promises = [];
  res.locals.a = {};
  res.locals.b = {};
  res.locals.user = req.session.user
  db.getBooksAndAuthIds().then((pbooks) => {
    Promise.all(pbooks).then((books) => {
      res.locals.books = books;
      db.getBooksForAllAuthors().then((pabs) => {
        Promise.all(pabs).then((data) => {
          res.locals.authorbooks = data;
          promises.push(db.getAuthors());
          promises.push(db.getGenres());
          promises.push(db.totalBooks());
          promises.push(db.totalAuthors());
          Promise.all(promises).then((data) => {
            res.locals.authors = data[0];
            res.locals.genres = data[1];
            res.locals.totBooks = data[2];
            res.locals.totAuthors = data[3];
            next();
          });
        });
      });
    });
  });
}

module.exports = {
  checkPassword: (input) => {
    const errors = [];
    if (input.password.length < 6) {
      errors.push('Password must be at least six characters');
    }
    if (input.password !== input.password_confirm) {
      errors.push('Passwords must match');
    }
    return errors;
  },
  reqAdmin: (req, res, next) => {
    if (req.session.user.is_admin) {
      next();
    } else {
      res.redirect('/signin');
    }
  },
  checkBook: (book) => {
    const errors = [];
    if (!book.title) errors.push('Title must not be blank');
    if (book.author2) {
      if (book.author1 === book.author2) errors.push('Authors must be unique');
    }
    if (book.author3) {
      if (book.author1 === book.author2 || book.author1 === book.author3 || book.author2 === book.author3) errors.push('Authors must be unique');
    }
    return errors;
  },
  checkAuthor: (author) => {
    const errors = [];
    for (var i = 1; i < author.added_books.length; i++) {
      if (author.added_books[i] == author.added_books[i - 1]) {
        errors.push('Book titles must be unique');
      }
    }
    if (!author.first_name) errors.push('First name cannot be blank');
    if (!author.last_name) errors.push('Last name cannot be blank');
    return errors;
  }
}

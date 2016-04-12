module.exports = {
  checkPassword: (input) => {
    if (input.password.length < 6) {
      return 'Password must be at least six characters';
    }
    if (input.password !== input.password_confirm) {
      return 'Passwords must match';
    }
  },
  reqAdmin: (req, res, next) => {
    if (req.session.user.is_admin) {
      next();
    } else {
      res.redirect('/signin');
    }
  }
}

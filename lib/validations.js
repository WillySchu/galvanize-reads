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
  }
}

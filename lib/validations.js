module.exports = {
  checkPassword: (input) => {
    if (input.password !== input.confirm_password) {
      return 'Passwords must match';
    }
  }
}

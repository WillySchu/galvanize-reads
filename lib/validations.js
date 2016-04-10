module.exports = {
  checkPassword: (input) => {
    if (input.password !== input.repassword) {
      return 'Passwords must match';
    }
  }
}

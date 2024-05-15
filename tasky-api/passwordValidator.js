const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

function validatePassword(password) {
  return re.test(password);
}

module.exports = validatePassword;

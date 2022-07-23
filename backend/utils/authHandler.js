let jwt = require("jsonwebtoken");

//check if user is authorized
const auth = (token) => {
  try {
    jwt.verify(token, "token");
    return true;
  } catch (err) {
    return false;
  }
};

//create a json web token
const sign = (data) => {
  const token = jwt.sign(data, "token");

  return token;
};

module.exports = { auth, sign };

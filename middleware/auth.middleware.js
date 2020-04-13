const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    if(!decoded){
      return res.status(401).json({message: 'Ваш токен истек, авторизуйтесь снова!'})
    }
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({message: 'Ошибка авторизации'})
  }
};

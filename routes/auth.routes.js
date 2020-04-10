const config = require("config");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Некорректный Email").isEmail(),
    check("password", "Пароль должен содержать не менее 6 символов").isLength({
      min: 6,
    }),
  ],
  async (request, response) => {
    try {
      console.log('Body', request.body)

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные при регистрации",
        });
      }

      const { email, password } = request.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        return response
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email: email, password: hashedPassword });
      await user.save();

      return response.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      response
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова!" });
      console.error(e)
    }
  }
);
router.post(
  "/login",
  [
    check("email", "Некорректный email").normalizeEmail().trim().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные при входе в систему",
        });
      }
      const { email, password } = request.body;

      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return response
          .status(400)
          .json({ message: "Пользователя с указанными данными не существует" });
      }

      const passwordIsMatch = await bcrypt.compare(password, user.password);
      if (!passwordIsMatch) {
        return response.status(400).json({ message: "Неверный пароль" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      response.status(200).json({token, userId: user.id})
    } catch (e) {
      response
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова!" });
    }
  }
);

module.exports = router;

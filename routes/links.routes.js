const config = require("config");
const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const shortId = require("shortid");
const Link = require("../models/Link");
const router = Router();
const auth = require("../middleware/auth.middleware");

router.post(
  "/generate",
  [auth, check("from", "Некорректный URL").isURL()],
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      console.log("Ошибки ");
      return res.status(400).json({ message: "Некорректный URL", errors });
    }

    try {
      const baseUrl = config.get("baseUrl");
      let { from } = req.body;
      
      // Если у url отсутствует префикс, то добавляем его
      if(!from.startsWith('https://') || !from.startsWith('http://') ){
        from = 'http://' + from
      }

      const code = shortId.generate();
      const linkExists = await Link.findOne({ from });

      if (linkExists) {
        return res.json({
          message: "Данная ссылка уже есть в базе",
          link: linkExists,
        });
      }

      const to = baseUrl + "/r/" + code;

      const link = new Link({
        from,
        to,
        code,
        date: Date.now(),
        owner: req.user.userId,
      });

      await link.save();

      res.status(201).json({ message: "Ссылка сгенерирована", link });
    } catch (e) {
      res.status(500).json({ message: "Не удалось сгенерировать ссылку" });
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json({ links });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json({ link });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;

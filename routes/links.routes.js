const config = require("config");
const { Router } = require("express");
const shortId = require("shortid");
const Link = require("../models/Link");
const router = Router();
const auth = require("../middleware/auth.middleware");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
    const code = shortId.generate();
    const linkExists = await Link.findOne({ from });
    
    if (linkExists) {
      return res.json({
        message: "Данная ссылка уже есть в базе",
        link: linkExists,
      });
    }
    
    const to = baseUrl + "/t/" + code;

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
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json({links});
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json({link});
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
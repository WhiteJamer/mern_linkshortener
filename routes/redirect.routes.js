const { Router } = require("express");
const Link = require("../models/Link");
const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const link = await Link.findOne({ code });

    if (link) {
      link.clicks++;
      link.save();
      return res.redirect(link.from);
    }

    return res.status(404).json({ message: "Ссылка не найдена" });
    
  } catch (e) {
    return res.status(500).json({ message: "При редиректе произошла ошибка" });
  }
});

module.exports = router;

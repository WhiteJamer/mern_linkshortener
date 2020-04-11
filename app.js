const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const PORT = config.get("port") || 5000;

const app = express();

app.use(express.json({extended: true})); // Для парсинга JSON
app.use("/api/links", require("./routes/links.routes"));
app.use("/api/auth", require("./routes/auth.routes"));


async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Connect to DB: Success')
    app.listen(PORT, () =>
      console.log(`APP has been started on ${PORT} port ...`)
    );
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();

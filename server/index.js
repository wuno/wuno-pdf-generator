const express = require("express");
const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const api = require("./api");
const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8080;

app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  let options = {
    inflate: true,
    limit: "6000kb",
    type: "application/octet-stream"
  };

  app.use(bodyParser.json());
  app.use(bodyParser.raw(options));
  app.use(bodyParser.urlencoded({ extended: true }));

  // CORS Settings
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, OPTIONS"
    );
    next();
  });

  // Routes all imported from the /routes directory
  app.use("/api/v1", api);

  // This will help with error handler in development
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    next();
  });

  app.use(nuxt.render);
  // Listen the server
  app.listen(port, host);
  console.log("Server listening on http://" + host + ":" + port); // eslint-disable-line no-console
}

start();

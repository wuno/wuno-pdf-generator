const { Router } = require("express");
// Add new route files here
const pdf = require("./pdf");

const router = Router();

router.use("/pdf", pdf);

module.exports = router;

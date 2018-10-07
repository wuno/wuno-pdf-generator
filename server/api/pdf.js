const { Router } = require("express");
const pdf = require("../controllers/pdf");

const router = Router();

router.post("/", pdf.setTemplate, (req, res, next) => {});

router.get("/", pdf.setTemplate, (req, res, next) => {});

router.get("/test/get", (req, res, next) => {
  res.json({
    method: "GET",
    message: "wunO PDF Generator is configured correctly",
    status: "operational"
  });
});

router.post("/test/post", (req, res, next) => {
  res.json({
    method: "POST",
    message: "wunO PDF Generator is configured correctly",
    status: "operational"
  });
});

module.exports = router;

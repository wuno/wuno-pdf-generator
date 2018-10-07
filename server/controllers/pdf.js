const fs = require("fs");
const { URLSearchParams } = require("url");
const puppeteer = require("puppeteer");

const templates = {
  exampleTemplate: "example-template"
};

exports.setTemplate = (req, res, next) => {
  let template = "";
  const reqMethod = req.method;
  const PDF_API_LOCAL = "http://localhost:8080";

  if (reqMethod === "POST") {
    template = templates[req.body.template];
  } else if (reqMethod === "GET") {
    template = templates[JSON.parse(req.query.data).template];
  } else {
    template = null;
  }

  try {
    (async () => {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true,
        dumpio: false
      });

      const page = await browser.newPage();

      const data = reqMethod === "POST" ? req.body : JSON.parse(req.query.data);

      const { pdfOptions, ...templateData } = data;

      const url = `${PDF_API_LOCAL}/${template}?data=${JSON.stringify(
        templateData
      )}`;

      await page.goto(url);

      const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "20px"
        },
        ...pdfOptions
      });

      await browser.close();

      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": `attachment; filename= + ${template}.pdf`,
        "Content-Length": pdfBuffer.length
      });

      res.end(pdfBuffer);
    })();
  } catch (err) {
    res.json({
      status: "Failed",
      message: "Something went wrong rendering your PDF. Please try again.",
      error: err
    });
  }

  next();
};

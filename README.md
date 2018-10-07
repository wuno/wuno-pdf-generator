# Global PDF Generator

> API for rendering PDF documents through the use of modern web templates.

## Project Summary

This project was made with the intentions to make rendering PDFs with premade templates easier. This project uses cutting edge technology and can render anything from simple text to SVG.

Template creations are made with Vue.js empowering the template creator to build beautiful templates while parsing their own data. This removes the need for any one team to maintain this project and makes it simple for anyone to create new templates.

Each template is a directory uploaded to the pages directory of this project. Each template directory will consist of index.vue and mockData.js

```bash
# Template boilerplate example
/pages/template-name/index.vue
/pages/template-name/mockData.js
```

**Adding Templates**

Templates will be selected by passing a template name value to the API end point in the key of template. It is imperative that you add your template name to the templates object in,

```bash
wuno-pdf-generator/server/controllers/pdf.js
```

```javascript
// e.g.
const templates = {
  exampleTemplate: "example-template"
};

const template = templates[req.body.template];
```

All available template links are displayed on the home page of this project so people can easily browse available templates. The link will open the template in the browser loading the mock data. This rendered page will be an exact representation of the generated PDF. This allows us to keep the project organized and well documented without.

**Adding Fonts**

To add a new font to the API simply add your font file to the /assets/fonts directory. Once the font exists in the project you can use @font-face in the component to bring your font into scope.

```css
/* Example */
@font-face {
  font-family: "antonio-regular-webfont";
  font-weight: normal;
  font-style: normal;
  src: url("~assets/fonts/antonio-regular-webfont.woff"); /* IE9 Compat Mode */
  src: url("~assets/fonts/antonio-regular-webfont.woff2") format("woff");
}
```

## Known Issues

Puppeteer has known issues running on Debian Linux servers. It fails due to dependency issues. The missing dependencies can be installed and the puppeteer instance must be ran passing options to the launch function. More on this issue and how to solve it can be [found here](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md).

```javascript
const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  ignoreHTTPSErrors: true,
  dumpio: false
});
```

## Technologies

This project was built with [Nuxt.js](https://nuxtjs.org/), [Express](https://expressjs.com/), [Bootstrap](https://bootstrap-vue.js.org/) and [Puppeteer](https://developers.google.com/web/tools/puppeteer/).

**Nuxt.js**

Nuxt is a framework for server side rendering Vue.js application. SSR allows us to build a PDF generating application that performs very well. Nuxt gives us better control over the routing in this application out of the box as well as easy to create end points for our API. One of the important features in this application is the ability to determine which parts of our application are rendered server side and which parts are rendered client side. The outcome is a scalable application with if any, very few limits.

**Express**

Express is the most popular Node.js framework used for building a robust API. It comes packaged with countless features allowing the very fast creation of a new API. Performance is high and the dependency is very light.

**Bootstrap**

Bootstrap is a front end framework used for building mobile first applications. It is well documented and highly supported by a strong community. Through the use of Bootstrap it is possible to build responsive web pages very quickly with HTML and CSS.

**Puppeteer**

Puppeteer is a very cutting edge technology that is used for controlling headless Chrome or Chromium. It can be used for rendering webpages without a browser. In our case we are using it to render our Vue templates server side and then creating a PDF from them.

## Versioning

API end points are versioned to keep track of the evolution of this application. This versioning is mentioned in every end point.

```bash
# e.g.
 api/v1/pdf
```

This is not to be confused with the versioning of deployment branches. Deployments are versioned in their respective branches.

```bash
# e.g.
https://github.com/wuno/wuno-pdf-generator/tree/versions/v1
```

## Development Setup

**Yarn**

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:8080
$ yarn run dev

# build for production or launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

**NPM**

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production or launch server
$ npm run build
$ npm start

# generate static project
$ npm run build
```

## Unit Testing

This application uses Jest and Puppeteer for unit testing.

**Configuration**

`jest-puppeteer` is used to start an instance of the server in which the unit tests will be performed.
It will basically call `npm start` before the unit tests start.
To configure how the server is launched, you can update `jest-puppeteer.config.js`.
Note that the timeout has been changed from the default 5s, to 30s.

**Launch the tests**

**Yarn**

```bash
# launch the test suite
$ yarn test
```

**NPM**

```bash
# launch the test suite
$ npm test
```

## Deployment

This application is completely stateless and has been deployed to a Cloud Foundry environment in the past. Due to the known issues mentioned above it was necessary to wrap this application in a Docker image. The Docker image provides the ability to install any missing dependencies while running in Cloud Foundry.

## Consuming the service

Once deployed, the service can take POST and GET requests.
You can pass in some parameters that will be consumed by both the API and the component you would like to render.
Note that the `template` parameter is mandatory, as it determines which template will be rendered.

**Parameters**

The `template` parameter is mandatory and determines which template will be rendered.
The `pdfOptions` parameter will be passed to the `.pdf` method of the `page` object, see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
All the other parameters will be passed to the component generated, as data parameters.

Here is an example of the object you can create:

```javascript
const data = {
  template: "exampleTemplate",
  testFieldOne: "wunO",
  testFieldTwo: "PDF",
  testFieldThree: "Generator",
  testFieldFour: "For generating PDFs",
  testFieldFive: "Pass data in with a POST or GET request",
  testFieldSix: "wunO PDF Generator",
  chartOne: "100",
  chartTwo: "200",
  chartThree: "300",
  chartFour: "400",
  chartFive: "500"
  pdfOptions: {
    landscape: true,
    margin: {
      top: "20px",
      left: "200px",
      right: "20px",
      bottom: "20px"
    }
  }
};
```

**GET request sample, using fetch**

```javascript
const url = new URL(`${myEndpoint}`);
url.search = "data=" + encodeURI(JSON.stringify(data));
return fetch(url).then(response => response.blob());
```

**POST request sample, using fetch**

```javascript
const url = new URL(`${myEndpoint}`);
return fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
}).then(response => response.blob());
```

**Example API Call**

```javascript
http://localhost:8080/api/v1/pdf?data={"template":"exampleTemplate","testFieldOne":"wunO","testFieldTwo":"PDF Param","testFieldThree":"Generator Param","testFieldFour":"For generating PDFs Param","testFieldFive":"Pass data in with a POST or GET request","testFieldSix":"wunO PDF Generator","chartOne":"100","chartTwo":"200","chartThree":"300","chartFour":"400","chartFive":"500"}
```

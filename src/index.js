import "babel-polyfill";
import express from "express";
import renderer from "./helpers/renderer";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import Routes from "./client/Routes";
import createStore from "./helpers/createStore";

const app = express();

app.use(
  "/api",
  proxy("https://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "http://localhost:3000";
      return opts;
    },
  })
);

app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createStore(req);

  // some logic to initialize the store
  // and load data into the store
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      console.log("not found");
      res.status(404);
    }
    res.send(content);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

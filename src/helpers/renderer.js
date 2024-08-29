import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serializeJavascript from "serialize-javascript";
import Routes from "../client/Routes";

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  const html = `
    <html>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <body>
        <div id="root">${content}</div>
        <script>
          window.__INIT_STATE__ = ${serializeJavascript(store.getState())};
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;

  return html;
};

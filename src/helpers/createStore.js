import { applyMiddleware, createStore } from "redux";
import Axios from "axios";
import thunk from "redux-thunk";
import reducers from "../client/reducers";

export default (req) => {
  const axiosInstance = Axios.create({
    baseURL: "https://react-ssr-api.herokuapp.com",
    headers: {
      cookie: req.get("cookie") || "",
    },
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
  return store;
};

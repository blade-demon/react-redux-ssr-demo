import React from "react";

const HomePage = () => {
  return (
    <div>
      <div>Home component!!!</div>
      <button onClick={() => console.log("clicked")}>Click me</button>
    </div>
  );
};

export default {
  component: HomePage,
};

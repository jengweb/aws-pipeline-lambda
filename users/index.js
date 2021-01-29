const serverless = require('serverless-http');
const express = require("express");
const app = express();
const userHandler = require("./userHandler");

app.use(express.json());

const routes = [
  {
    prefix: "/",
    target: userHandler,
  },
];

for (let route of routes) {
  app.use(route.prefix, route.target);
}

module.exports.handler = serverless(app);

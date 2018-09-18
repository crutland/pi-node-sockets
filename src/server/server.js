const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const path = require("path");
const wwwroot = "../client";
const index = path.resolve(__dirname, wwwroot, "index.html");


const app = express();
app.use(express.static(`${__dirname}/${wwwroot}`))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors());

app.get("*", (_, res) => res.sendFile(index));

module.exports = {
    app,
    http: http.Server(app)
}
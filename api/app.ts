/*" use strict";
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/", {
    "index": "index.html"
}));

//roteamento
//app.get("/api/getAll", requestHandlers.getAll);

app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
}); */
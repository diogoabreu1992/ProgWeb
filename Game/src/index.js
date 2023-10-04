const express = require("express");
const router = require("./config/routes");
const app = express();
const handlebars = require('express-handlebars');

app.use(router);

app.engine("handlebars", handlebars.engine());

app.set("view engine", "handlebars");

app.set("views", `${__dirname}/views`);

app.use("/img", [
    express.static(`${__dirname}/../public/img`)
]);

app.use((req, res) => {
    res.end("Acesse o arquivo /img/pikachu.png");
});

app.listen(3000, () => {
    console.log("Express app iniciada na porta 3000.");
});
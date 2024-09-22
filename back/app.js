require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const sequelize = require("./database/db");
const errorMiddleware = require("./middlewares/error-handler-middleware");
const mainRouter = require("./routes/main-router");

const PORT = process.env.PORT;
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + 'static'));
app.use(fileUpload({}));
app.use(cors());

app.use("/api", mainRouter);
app.use(errorMiddleware);

//Handling errors
// app.use(errorMiddleware);

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, () => {
            console.log("Server started");
        })
    } catch (error) {
        console.log(error);
    }
}

start();

require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");

const sequelize = require("./database/db");
const errorMiddleware = require("./middlewares/error-handler-middleware");
// const scheduleDestructor = require("./middlewares/scheduled-destruction-middleware");
const mainRouter = require("./routes/main-router");

const discountController = require('./controllers/discount-controller');

const dayFormula = require("./util/day-formula");

const PORT = process.env.PORT;

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_CLIENT_URL
]

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + 'static'));
app.use(fileUpload({}));
app.use("*", cors({
    credentials: true,
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(cookieParser());

app.use("/api", mainRouter);

cron.schedule("59 23 * * 0-6", () => {
    discountController.scheduledDeleteDiscount(dayFormula());
});

app.use(errorMiddleware);

const server = http.createServer(app);

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

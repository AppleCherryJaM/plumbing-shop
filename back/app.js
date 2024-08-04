const path = require('path');
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Couldn't find this rout", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || "Unknown error" })
})

app.listen(PORT);

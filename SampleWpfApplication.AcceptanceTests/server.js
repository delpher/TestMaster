const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.listen(5000);
const express = require("express");

require('dotenv').config({path:'./config/dev.env'});
require("./util/dbConnection");

const app = express();


const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const adminRoutes = require("./router/admin");
const personRoutes = require("./router/person");
const movieRoutes = require("./router/movie");
const seriesRoutes = require("./router/series");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/person", personRoutes);
app.use("/movie", movieRoutes);
app.use("/series", seriesRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server on port ${port}`);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message
    });
});

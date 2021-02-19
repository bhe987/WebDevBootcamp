// Wedn Feb 17, 2021 470. Express Router intro
const express = require("express");
const app = express();
const shelterRoutes = require("./routes/shelters");
const dogRoutes = require("./routes/dogs");
const adminRoutes = require("./routes/admin");

app.use("/shelters", shelterRoutes);
app.use("/dogs", dogRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, function(){
    console.log("Serving app on port 3000.");
});
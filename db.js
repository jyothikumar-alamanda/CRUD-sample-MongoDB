const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost:27017/crudDB", (err) => {
mongoose.connect("mongodb+srv://admin:admin@cluster0.hl2ct.mongodb.net/test", (err) => {    
    if(!err)
        console.log("MongoDB connection succesful.");
    else    
        console.log("MongoDB connection failed. error: " + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;

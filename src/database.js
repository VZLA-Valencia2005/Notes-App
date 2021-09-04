const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(db => console.log("DB is Connected"))
  .catch(err => console.log(err));

const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/blooddonation' || process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

module.exports = mongoose

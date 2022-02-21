const mongoose = require("../db/mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const Donor = require("./donor")
const Request = require("./request")

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
},
 {
    timestamps: true
})


userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema)
module.exports = User
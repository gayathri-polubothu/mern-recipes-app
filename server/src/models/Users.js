const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}]
})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel
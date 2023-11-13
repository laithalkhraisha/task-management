const mongoose = require('mongoose');

// Define the schema
const Schema = mongoose.Schema


const userschema= new Schema({
    name:  String,
    email: String ,
    password: String,


});

// Create a model based on the schema
const user = mongoose.model('user', userschema);

module.exports = user

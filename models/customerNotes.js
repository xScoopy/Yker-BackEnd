const mongoose = require('mongoose')
const Schema = mongoose.Schema

//notes schema. Just an email and an array of notes. 
const CustomerNotesSchema = new Schema({
    email: {type: String, required: true},
    notes: [{type: String}]
})
const CustomerNotes = mongoose.model('CustomerNotes', CustomerNotesSchema)
module.exports = CustomerNotes
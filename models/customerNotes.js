const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerNotesSchema = new Schema({
    email: {type: String, required: true},
    notes: [{type: String}]
})
const CustomerNotes = mongoose.model('CustomerNotes', CustomerNotesSchema)
module.exports = CustomerNotes
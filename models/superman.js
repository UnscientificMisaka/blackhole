const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SupermanSchema = new Schema({
    ip: { type: String },
    content: { type: String },
    create_at: { type: Date, default: Date.now }
});

mongoose.model('Superman', SupermanSchema);
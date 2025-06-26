const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortcode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  validity: { type: Number, default: 30 },
  clicks: [{ timestamp: Date, referrer: String, geo: String }]
});

module.exports = mongoose.model('Url', urlSchema);
const Url = require('../models/Url');
const generateShortCode = require('../utils/generateShortCode');

// Create a shortened URL
exports.createShortUrl = async (req, res) => {
  try {
    let { url, validity, shortcode } = req.body;

    // Basic validation
    if (!url) return res.status(400).json({ error: 'Original URL is required' });
    if (!validity) validity = 30; // default 30 minutes

    // Generate shortcode if not provided
    if (!shortcode) {
      shortcode = generateShortCode();
    }

    // Check for duplicate shortcode
    const existing = await Url.findOne({ shortcode });
    if (existing) {
      return res.status(400).json({ error: 'Shortcode already exists. Try another or leave it empty.' });
    }

    // Create new URL document
    const newUrl = await Url.create({
      url,
      shortcode,
      validity,
      createdAt: new Date()
    });

    const expiry = new Date(newUrl.createdAt.getTime() + validity * 60000); // validity in minutes

    res.status(201).json({
      shortLink: `http://localhost:3001/shorturls/${shortcode}`,
      expiry: expiry.toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating short URL' });
  }
};

// Fetch stats for a given shortcode
exports.getStats = async (req, res) => {
  try {
    const { shortcode } = req.params;

    const urlDoc = await Url.findOne({ shortcode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    const expiry = new Date(urlDoc.createdAt.getTime() + urlDoc.validity * 60000);

    res.status(200).json({
      url: urlDoc.url,
      createdAt: urlDoc.createdAt,
      expiry,
      clicks: urlDoc.clicks.length,
      clickDetails: urlDoc.clicks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching stats' });
  }
};

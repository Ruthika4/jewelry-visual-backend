const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleSearch } = require('../controllers/searchController');

// Set up multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, 'query.jpg'); // overwrite existing query each time
  },
});

const upload = multer({ storage });

router.post('/search', upload.single('image'), handleSearch);

module.exports = router;

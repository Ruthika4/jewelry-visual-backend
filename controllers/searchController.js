const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const handleSearch = (req, res) => {
  try {
    // Path to the uploaded image
    const imagePath = path.join(__dirname, '../uploads/query.jpg');

    // Check if the uploaded query image exists
    if (!fs.existsSync(imagePath)) {
      console.error("Image file not found:", imagePath);
      return res.status(500).json({ error: "query.jpg not found" });
    }

    console.log("Image path passed to Python:", imagePath);

    // Use absolute path to Python script
    const scriptPath = path.join(__dirname, '../utils/extractFeatures.py');
    const pythonCmd = `python "${scriptPath}" "${imagePath}"`;

    exec(pythonCmd, (error, stdout, stderr) => {
      console.log("Python STDOUT:", stdout);
      console.error("Python STDERR:", stderr);

      if (error) {
        console.error('Exec error:', error.message);
        return res.status(500).json({ error: 'Execution failed', details: error.message });
      }

      if (stderr && !stdout.trim()) {
        return res.status(500).json({ error: 'Python script error', stderr });
      }

      try {
        const results = JSON.parse(stdout);

        // Log final image URLs for debugging
        results.forEach((item) => {
          console.log("Final image path:", `http://localhost:5000/${item.path}`);
        });

        res.json(results);
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError.message);
        console.error('Raw Python output:', stdout);
        res.status(500).json({ error: 'Invalid JSON from Python script', details: jsonError.message });
      }
    });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

module.exports = { handleSearch };

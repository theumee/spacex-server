const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/api/capsules', authMiddleware, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const data = await fetch('https://api.spacexdata.com/v3/capsules');
    const capsules = await data.json();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = capsules.slice(startIndex, endIndex);

    res
      .json({
        page,
        limit,
        total: capsules.length,
        data: results,
      })
      .status(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

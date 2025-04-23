const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/news', async (req, res) => {
  const { q = "everything", page = 1, from = "2025-04-05" } = req.query;
  const pageSize = 25;

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q,
        from,
        page,
        pageSize,
        language: "en",
        sortBy: "popularity",
        apiKey: process.env.NEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("News API error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

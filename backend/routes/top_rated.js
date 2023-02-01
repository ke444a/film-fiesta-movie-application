const url = require("url");
const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY_VALUE = process.env.API_KEY_VALUE;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_URL = process.env.TOP_RATED_BASE_URL;


router.get("/", async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });
        const apiRes = await axios.get(`${API_URL}?${params}`);
        res.status(200).json(apiRes.data.results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
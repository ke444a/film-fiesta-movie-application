const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET'],
}
app.use(cors(corsOptions));

// Routes
app.use('/trending', require('./routes/trending'));
app.use('/top_rated', require('./routes/top_rated'));
app.use('/search', require('./routes/search'));
app.use('/movie', require('./routes/movie'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

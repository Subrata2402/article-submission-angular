const express = require('express');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/post_routes');
const getRoutes = require('./routes/get_routes');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
require('./database/db');

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*',
    // credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

app.use('/', express.static('public'));
app.use('/api', postRoutes);
app.use('/api', getRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Article Submission API');
});

// app.get('/save-cookie', (req, res) => {
//     console.log(req.cookies);
// })

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}...`);
});
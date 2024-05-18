const config =  require('./config.js');
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');

const { PORT,NODE_ENV, MONGO_URI} = config;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const app = express();

app.use(express.json());
app.use('/api', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} IN THE MODE ${NODE_ENV} .`);
});

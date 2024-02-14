const express = require('express');
const mongoose = require('mongoose');
const swaggerSetup = require('./swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => console.error("Error connecting to MongoDB: ", err));

app.use(express.json());

app.use('/api', require('../src/routes/productRoutes'));
app.use('/api', require('./routes/categoryRoutes'));

swaggerSetup(app);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
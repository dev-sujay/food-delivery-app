const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');



// Load env vars
dotenv.config();



const app = express();
const PORT = process.env.PORT || 8080;


//connect to db
connectDB();


//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


//routes
app.use("/api/v1/auth", require('./routes/authRoute'));
app.use("/api/v1/users", require('./routes/userRoute'));


app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Server failed to start', error);
    }
});
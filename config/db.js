const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI);
        if (connected) {
            console.log('MongoDB connected');
        }
        return connected;
    } catch (error) {
        console.error('MongoDB connection failed', error);
    }
}

module.exports = connectDB;
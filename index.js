const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/user.routes.js');
const rideRoutes = require('./Routes/ride.routes.js');
const bookingRoutes = require('./Routes/booking.routes.js');
const optRoutes = require('./Routes/otp.routes.js');
const { successResponseBody } = require('./Utils/responseBody.js');

const env = require('dotenv');
const cors = require('cors');

env.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


userRoutes(app);
rideRoutes(app);
bookingRoutes(app);
optRoutes(app);


app.use('/',(req, res)=> {
    successResponseBody.data = { message: 'Page Not Found!'};
    res.status(400).json(successResponseBody);
})



mongoose.connect(process.env.MONGO_URI, {
    autoIndex: true
})
.then(() => {
    console.log("MongoDB Atlas Connected Successfully!");

    app.listen(5050, () => {
        console.log("Server started successfully on port 5050.");
    });
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

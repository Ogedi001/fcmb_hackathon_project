//node install modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

//file modules
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require('./routes/userProfileRoute')
const beneficiariesRoute = require('./routes/beneficiaryRoute')

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cookieParser());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next()
})

// Using the routes
app.use('/api/auth', authRoutes);
app.use('/api/user', profileRoutes);
app.use('/api/user',beneficiariesRoute)


//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});






const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const main = async () => {
    try {
        console.log("connecting to Database.....");
        await mongoose.connect(DB_URL);
        console.log("Database connected successfully");

        // app.use("/", appRouter);
 

        app.listen(PORT, () => {
            console.log(`App is live at https://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Error starting the server:", error);
    };
}

main();

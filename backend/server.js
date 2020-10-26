const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// image upload
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);
// app.use("/api/upload/shop", uploadRoutes);
//app.use("/api/upload/review", uploadRoutes);
var __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use("/uploads/shop", express.static(path.join(__dirname, "/uploads/shop")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

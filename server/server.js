const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Authentication
app.use("/api/auth", authRoutes);

// Complaint Management
app.use("/api/complaints", complaintRoutes);

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.json({
    message: "Complaint Management System API is Running...",
  });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `Server running on http://127.0.0.1:${PORT}`
  );
});

// ================= SERVER ERROR =================
server.on("error", (err) => {
  console.error("Listen Error:", err);
});
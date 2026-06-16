require("dotenv").config();

const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: "Terjadi kesalahan pada server",
  });
});

module.exports = app;
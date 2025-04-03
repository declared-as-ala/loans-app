require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { throttleMiddleware } = require("./middleware/throttleMiddleware");
const authRoutes = require("./routes/authRoutes");
const loansRoutes = require("./routes/loansRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Example rate throttling
app.use(throttleMiddleware);

// Routes
app.use("/api", authRoutes);
app.use("/api", loansRoutes);

// Global error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

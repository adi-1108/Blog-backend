const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5001;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./corsOptions");
connectDb();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/", require("./routes/blogRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

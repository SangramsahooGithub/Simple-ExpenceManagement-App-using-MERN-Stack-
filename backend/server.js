const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/transacrionRoute"));

app.listen(process.env.PORT, () => {
  console.log(`Expence app Running on ${process.env.DEV_MODE}`);
});

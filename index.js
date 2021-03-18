const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const connect = require("./utils/connect");

dotenv.config();

const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const userRoute = require("./routes/userRoute");
const cookieRoute = require("./routes/cookieRoutes");

app.use("/api/user", userRoute);
app.use("/api/cookie", cookieRoute);

app.listen(PORT, async () => {
  console.log(`🚀 server up and running at port ${PORT}`);

  await connect();
});

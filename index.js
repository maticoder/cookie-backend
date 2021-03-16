const express = require("express");
const app = express();
const router = express.Router();

const PORT = 7000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`🚀 server up and running at port ${PORT}`);
});

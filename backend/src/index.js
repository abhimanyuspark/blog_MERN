require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/connectDb");
const cors_options = require("./config/cors");
const app = express();

const PORT = process.env.PORT;

app.use(cors(cors_options));

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));

app.use(cookieParser());

app.use("/api/auth", require("./routes/auth_routes"));
// app.use("/api/users", require("./routes/user_routes"));
// app.use("/api/ai", require("./routes/ai_routes"));
// app.use("/api/blogs", require("./routes/blog_routes"));
// app.use("/api/comments", require("./routes/comment_routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.use((req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});

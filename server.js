import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Import and use user routes
import userRoutes from "./routes/user.routes.js";
app.use("/user", userRoutes);

import projectRoutes from "./routes/project.routes.js"
app.use("/projects", projectRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

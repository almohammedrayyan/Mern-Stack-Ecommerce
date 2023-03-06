const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDataBase = require("./confiq/database");
//handling uncaught exception
const http = require("http");
const server = http.createServer(app);

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  process.exit(1);
});
const PORT = process.env.PORT || 4000;
//confiq
dotenv.config({ path: "backend/.env" });
connectDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

server.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

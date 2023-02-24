const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDataBase = require("./confiq/database");
//handling uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  process.exit(1);
});
//confiq

dotenv.config({ path: "backend/confiq/confiq.env" });

//connecting database

connectDataBase();

// cloudinary.config({
//   cloud_name: "dotylvduq",
//   api_key: "814661749281152",
//   api_secret: "M7AfXdmCtZt3cWr65lelRkDbTto",
// });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(process.env.PORT, () => {
  console.log(`server is working on https://localhost:${process.env.PORT}`);
});

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

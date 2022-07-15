// const db = require("./models/index"); // import all models
require("dotenv").config();
const { sequelize } = require("./models/index");

// UNCAUGHT EXCEPTIONS
// Application needs to be crashed then a tool will be needed to restart the APP
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!...");
  console.log({ err });
  console.log(err.name, err.message);
  process.exit();
});

const app = require("./app");

//   START SERVER

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "8888");

/**
 * Event listener for HTTP server "listening" event.
 */

// create a http server and  Database Connection

// const server = app.listen(port, async () => {
//   const address = server.address();
//   const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
//   console.log(`Listening on ${bind}`);
// });

sequelize.authenticate().then(() => {
  app.listen(port, async () => {
    // const address = server.address();
    const bind =
      typeof address === "string" ? `pipe ${address}` : `port ${port}`;
    console.log(`Listening on ${bind}`);
  });
});

// Catching Exceptions

// Application does not necessarily need to be crashed
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!...");
  console.log(err.name, err.message);
  console.log({ err });
  // server.close(() => {
  //   process.exit();
  // });
});

process.on("SIGINT", async () => {
  // await db.sequelize.close();
  process.exit(0);
});

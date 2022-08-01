require("dotenv").config();
require("colors");

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`.yellow);
  console.log(`GraphiQL(http://localhost:${PORT}/graphql)`.red);
});

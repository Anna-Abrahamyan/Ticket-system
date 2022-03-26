import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import allRouters from "./routes/all.route.js";

const swaggerSpecs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticketing-system",
      version: "1.0.0",
    },
  },
  apis: ["routes/*.route.js"],
});

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use("/api/v1", allRouters);

async function startServerWork() {
  try {
    await mongoose.connect(process.env.DB_URL || 3000);
    console.log("Connection has been established successfully.");
    app.listen(process.env.APP_PORT, () =>
      console.log(
        `Authentication Server listening on port ${process.env.APP_PORT}`
      )
    );
  } catch (error) {
    console.log("Unable connecting to the DB.", error);
  }
}
startServerWork();

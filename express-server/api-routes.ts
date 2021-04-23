// Import dependencies
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { registry, appointments, operations } from "./schema";

const router = express.Router();

// Get database URL from docker-compose
const dbHost = "mongodb://localhost:27017/dentist-reservation"; // use this when run server and database separately
// const dbHost = "mongodb://mongodb/dentist-reservation"; // use this when running docker-compose
// Connect to DB
mongoose.connect(dbHost);
const registrySchema = new mongoose.Schema(registry);
const appointmentsSchema = new mongoose.Schema(appointments);
const operationsSchema = new mongoose.Schema(operations);

// Create mongoose model
const Registry = mongoose.model("Registry", registrySchema);
const Appointments = mongoose.model("Appointments", appointmentsSchema);
const Operations = mongoose.model("Operations", operationsSchema);

// TEST api listing
router.get("/", (req: Request, res: Response) => {
  res.send("api works");
});

// Registry API
// Get all
router.get("/registry", (req: Request, res: Response) => {
  Registry.find({}, (err, registry) => {
    if (err) res.status(500).send(err);

    res.status(200).json(registry);
  });
});

// GET - Find in registry
router.get("/registry/:id", (req: Request, res: Response) => {
  Registry.findById(req.params["id"], (err: any, registry: any) => {
    if (err) res.status(500).send(err);

    res.status(200).json(registry);
  });
});

// POST Create a registry entry
router.post("/registry", async (req: Request, res: Response) => {
  let registry = new Registry({
    name: req.body.name,
    surname: req.body.surname,
    birthday: req.body.birthday,
    email: req.body.email,
  });
  let isAlready = await Registry.find({name: req.body.name, surname: req.body.surname, birthday: req.body.birthday, email: req.body.email}).exec();
  if (isAlready.length > 0) {
    res.status(403).json({
      status: 403,
      message: "User already exists"
    });
  } else {
    registry.save((error: any) => {
      if (error) res.status(500).send(error);
  
      res.status(201).json({
        status: 201,
        message: "User created successfully",
      });
    });
  }
});

// DELETE
router.delete("/registry/:id", (req: Request, res: Response) => {
  Registry.findByIdAndDelete(
    req.params["id"],
    null,
    (err: any, doc: any, resp: any) => {
      if (err) res.status(500).send(err);

      res.status(200);
    }
  );
});

// Appointments API

// Operations API

module.exports = router;

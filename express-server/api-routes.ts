// Import dependencies
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { registry, appointments, operations } from "./schema";

const router = express.Router();

// Get database URL from docker-compose
const dbHost = "mongodb://mongodb/dentist-reservation";
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

// Find in registry
router.get("/registry/:id", (req: Request, res: Response) => {
  Registry.findById(req.params["id"], (err: any, registry: any) => {
    if (err) res.status(500).send(err);

    res.status(200).json(registry);
  });
});

// Create a registry entry
router.post("/registry", (req: Request, res: Response) => {
  let registry = new Registry({
    name: req.body.name,
    surname: req.body.surname,
    birthday: req.body.birthday,
    email: req.body.email,
  });

  registry.save((error: any) => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: "Entry created successfully",
    });
  });
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

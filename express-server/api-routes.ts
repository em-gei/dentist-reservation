// Import dependencies
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { registry, appointments, timetables } from "./schema";

const router = express.Router();

// Get database URL from docker-compose
const dbHost = "mongodb://localhost:27017/dentist-reservation"; // use this when run server and database separately
// const dbHost = "mongodb://mongodb/dentist-reservation"; // use this when running docker-compose
// Connect to DB
mongoose.connect(dbHost);
mongoose.set('useFindAndModify', false); // Make Mongoose use `findOneAndUpdate()`, this option is `true` by default, need to set it to false.
const registrySchema = new mongoose.Schema(registry);
const appointmentsSchema = new mongoose.Schema(appointments);
const timetablesSchema = new mongoose.Schema(timetables);

// Create mongoose model
const Registry = mongoose.model("Registry", registrySchema);
const Appointments = mongoose.model("Appointments", appointmentsSchema);
const Timetables = mongoose.model("Timetables", timetablesSchema);

function sendError(res: Response, error: any) {
  res.status(500).send(error);
}

// TEST api listing
router.get("/", (req: Request, res: Response) => {
  res.send("api works");
});

// ************** Timetables API *************
// Get all
router.get("/timetables", (req: Request, res: Response) => {
  Timetables.find({}, (err, timetables) => {
    if (err) res.status(500).send(err);

    res.status(200).json(timetables);
  });
});
// ********************************************


// ************** Registry API **************
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
  let name = req.body.name;
  let surname = req.body.surname;
  let fiscalCode = req.body.fiscalCode;
  let birthday = req.body.birthday;
  let email = req.body.email;
  if (name && surname && fiscalCode && birthday && email) {
    let registry = new Registry({
      name: name,
      surname: surname,
      fiscalCode: fiscalCode,
      birthday: birthday,
      email: email,
    });
    let isAlready = await Registry.find({fiscalCode: fiscalCode}).exec();
    if (isAlready.length > 0) {
      res.status(403).json({
        status: 403,
        message: "User already exists"
      });
    } else {
      registry.save((error: any) => {
        if (error) sendError(res, error);
            
        res.status(201).json({
          status: 201,
          message: "User created successfully",
        });
      });
    }
    
  } else {
    sendError(res, "Fields not valid");
  }

});

// DELETE
router.delete("/registry/:id", (req: Request, res: Response) => {
  Registry.findByIdAndDelete(
    req.params["id"],
    null,
    (err: any, doc: any, resp: any) => {
      if (err) res.status(500).send(err);

      res.status(200).json({
        status: 200,
        message: "User succesfully deleted"
      });
    }
  );
});

// PUT
router.put("/registry/:id", (req: Request, res: Response) => {
  Registry.findByIdAndUpdate(req.params['id'], req.body, (err: any, doc:any, resp: any) => {
    if (err) res.status(500).send(err);

    res.status(200).json({
      status: 200,
      message: "User succesfully modified!"
    });
  });
});
// ********************************************


// ************** Appointments API ************
// POST Create a registry entry
router.get("/appointments", (req: Request, res: Response) => {
  Appointments.find({}, (err, registry) => {
    if (err) res.status(500).send(err);

    res.status(200).json(registry);
  });
});

router.post("/appointments", async (req: Request, res: Response) => {
  let fiscalCode = req.body.fiscalCode;
  let date = req.body.date;
  let interval = req.body.interval;

  if (fiscalCode && date && interval) {
    let appointment = new Appointments({
      fiscalCode: fiscalCode,
      date: date,
      interval: interval
    });
    let isAlready = await Appointments.find({fiscalCode: fiscalCode, date: date, interval: interval}).exec();
    if (isAlready.length > 0) {
      res.status(403).json({
        status: 403,
        message: "Reservation already exists"
      });
    } else {
      appointment.save((error: any) => {
        if (error) sendError(res, error);
    
        res.status(201).json({
          status: 201,
          message: "Reservation created successfully",
        });
      });
    }
  } else {
    sendError(res, "Fields not valid");
  }
 
});

// DELETE
router.delete("/appointments/:id", (req: Request, res: Response) => {
  Appointments.findByIdAndDelete(
    req.params["id"],
    null,
    (err: any, doc: any, resp: any) => {
      if (err) res.status(500).send(err);

      res.status(200).json({
        status: 200,
        message: "Appointments succesfully deleted"
      });
    }
  );
});

// PUT
router.put("/appointments/:id", (req: Request, res: Response) => {
  Appointments.findByIdAndUpdate(req.params['id'], req.body, (err: any, doc:any, resp: any) => {
    if (err) res.status(500).send(err);

    res.status(200).json({
      status: 200,
      message: "Appointments succesfully modified!"
    });
  });
});

// ********************************************

module.exports = router;

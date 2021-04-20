// Import dependencies
import express, { Request, Response } from "express";
const router = express.Router();

// TEST api listing
router.get('/', (req : Request , res : Response) => {
        res.send('api works');
});


module.exports = router;
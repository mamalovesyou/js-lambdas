import * as express from "express";
import { Script } from "./scripts.interface";

/**
 * Router Definition
 */

export const scriptsRouter = express.Router();

/**
 * Controller Definitions
 */

// POST scripts/

scriptsRouter.post("/", async (req: express.Request, res: express.Response) => {
    try {
        const script: Script = req.body;

        // Add the script to our queue
        console.log("Added: " + script.content);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

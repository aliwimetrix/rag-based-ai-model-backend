import express, { Router } from "express";
// import { getDetails } from "../controllers/dashboard.controller.js";
import { getDashboard } from "../controllers/dashboard.controller.js";

const dashboard: Router = express.Router();

// dashboard.get('/', getDashboard);
dashboard.get('/:LineID', getDashboard);


export default dashboard;

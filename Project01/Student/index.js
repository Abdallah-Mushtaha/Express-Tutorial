import { Router } from "express";
import {
    getStudents,
    getGrades,
    getTableTime
} from "./controllers/students";
const router = Router();

router.get("/Profile", getStudents)
    .get("/grades", getGrades)
    .get("/tableTime", getTableTime
    )

export default router
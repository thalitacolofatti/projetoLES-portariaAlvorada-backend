import express from "express";
import { addBond, getBondByAluno, getBondByGuardian, deleteBond } from "../controllers/bond.js";
import { checkToken } from "../midldleware/tokenValidation.js";

const router = express.Router();

router.post("/add-bond", checkToken, addBond);
router.get("/get-bond-byaluno", checkToken, getBondByAluno);
router.get("/get-bond-byguardian", checkToken, getBondByGuardian);
router.put("/delete-bond", checkToken, deleteBond);

export default router;

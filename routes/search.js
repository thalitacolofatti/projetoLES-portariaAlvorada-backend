import express from "express";
import { buscaAluno, buscaResponsavel } from "../controllers/search.js";

const router = express.Router();

router.get("/busca-aluno", buscaAluno);
router.get("/busca-responsavel", buscaResponsavel);

export default router;
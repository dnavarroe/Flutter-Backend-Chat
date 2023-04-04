/*

    path:/api/usuarios

*/

import { Router } from "express";

import { validarJWT } from "../middlewares/validar-jwt";
import { getUsuarios } from "../controllers/usuarios";

const router = Router();

// obtener usuarios
router.get('/',validarJWT, getUsuarios);

export default router;
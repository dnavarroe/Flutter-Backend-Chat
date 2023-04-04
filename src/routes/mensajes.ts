/*

path: /api/mensaje

*/

import { Router } from "express";

import { validarJWT } from "../middlewares/validar-jwt";
import { getChat } from "../controllers/mensaje";


const router = Router();

// obtener usuarios
router.get('/:de',validarJWT, getChat);

export default router;
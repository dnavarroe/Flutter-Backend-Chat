/*

    path:/api/login

*/

import { Router } from "express";
import { check } from "express-validator";

import { createUser, loginUser, renewToken } from "../controllers/auth";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

router.post('/new', [
    check('username','El nombre es obligatorio').not().isEmpty(), 
    check('password','La contraseña es obligatoria').not().isEmpty(), 
    check('email','El correo es obligatorio').isEmail(), 
    validarCampos
],createUser);

router.post('/', [
    check('password','La contraseña es obligatoria').not().isEmpty(), 
    check('email','El correo es obligatorio').isEmail(), 
    validarCampos
],loginUser);

// validarJWT
router.get('/renew',validarJWT,renewToken );

export default router;
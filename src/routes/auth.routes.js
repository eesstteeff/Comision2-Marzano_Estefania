// Endpoints del Servidor
import {Router} from "express";
import {register, login, logout, profile} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateRegister, validateLogin, handleErrorValidations } from "../middlewares/validateAttribute.js";
 export const routes = Router();

//Rutas para el Registro de usuario
routes.post ("/register",validateRegister, handleErrorValidations, register);

//Rutas para el login
routes.post("/login",validateLogin, handleErrorValidations, login);

//rutas para el logout
routes.post("/logout", logout);

routes.get("/profile", authRequired, profile);






 
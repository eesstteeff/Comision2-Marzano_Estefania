import {body, validationResult} from "express-validator";


export const validateRegister = [
    body("username")
    .isLength({min:6})
    .withMessage("El Username debe tener al menos 6 caracteres"),


    body("email")
    .notEmpty()
    .withMessage("Email no debe estar vacio"),


    body("password")
    .isLength({min:6})
    .withMessage("El password debe contener al menos 6 caracteres"),
];


export const validateLogin = [
    body("email")
    .notEmpty()
    .withMessage("Email no debe estar vacio"),


    body("password")
    .isLength({min:6})
    .withMessage("El password debe contener al menos 6 caracteres"),
];

export const handleErrorValidations = (req, res, next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message:"Error en la validacion de atributos", error});
    }
    next();
};


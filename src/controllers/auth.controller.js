//Autenticacion del Usuario
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";
import { createAccessToken } from "../middlewares/jwt.validator.js";

//Registro de usuario
export const register = async (req, res) => {
    const {username, email, password} = req.body

    try {

        //Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

         const userSaved =await newUser.save();
        
         //Token forma 1

        /*jwt.sign(
            {id: userSaved._id},
             "proyectoBD",
             {expiresIn:"1h"},
             (err, token)=>{
                if(err)console.log(err);
                res.cookie("token", token);
                console.log(token);
                res.json(userSaved);
             });*/
            
             
        //Token forma 2

        const token = await createAccessToken({id: userSaved._id});
        res.cookie("token", token);
        res.json({
            message:"Usuario registrado con exito",
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
        });
     

        //res.status(200).json(Usersaved);
    } catch (error) {
        res.status(500).json({message:"Error al registrar al Usuario", error});


        
        
    }
};

//Login de usuario
export const login = async (req, res) => {
  const {email, password} = req.body;
    
  try {
       const userFound = await User.findOne({email});
       if (!userFound)
        return res.status(400).json({message:"Usuario no encontrado"});

       const match = bcrypt.compare(password, userFound.password);
       if (!match)
        return res.status(400).json ({message:"Contraseña incorrecta"});

    //Debemos generar Token nuevamente
   
    const token = await createAccessToken({id: userFound._id});
        res.cookie("token", token);
        res.json({
            message:"Bienvenido",
            username: userFound.username,
            email: userFound.email,
        });

    } catch (error) {
        res.status(500).json({message:"Error al loguearse", error});
    }
};

//Logout de usuario
export const logout = async (req, res)=>{
    res.cookie("token", "", {expires:new Date(0)});
    return res.status(200).json({message:"Hasta Pronto"});
};

export const profile = async(req, res)=>{
    try {
       const userFound = await User.findById(req.user.id);
        if(!userFound) return res.status(400).json({message:"Usuario no encontrado"});

        res.json({
            message:"Perfil",
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        res.status(500).json({message:"Error en el perfil", error});
    }
};


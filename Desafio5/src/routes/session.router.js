import { Router } from 'express';
import SessionManager from '../services/SessionManager';

const router = Router();
const manager = new SessionManager();

router.post("/register", async (req, res) => {
    const { nombre, apellido, email, edad, contrasenia } = req.body;
    try {
        let result = await manager.register(nombre, apellido, email, edad, contrasenia);
        res.status(result.code).json({message: result.status})
    } catch (error) {
        console.log(`Ocurrió un error en el servidor: ${error}`);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let result = await manager.login(email, password);
        let payload;
        if (result.code === 200) {
            req.session.user = result.sessionUser;
            payload = req.session;
        }
        res.status(result.code).json({status: result.status, payload})
    } catch (error) {
        console.log(`Ocurrió un error en el servidor: ${error}`);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error){
            res.status(400).json({error: "error logout", mensaje: "Error al cerrar la sesion"});
        }
       console.log("Sesion cerrada correctamente.");
    });
});

router.get("/current", (req, res) => {
    if (req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      console.log('No hay sesión activa');
    }
});

export default router;
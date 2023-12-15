import { dbUsers } from "../models/User.mongoose";

export default class SessionManager {
    async register(nombre, apellido, email, edad, contrasenia) {
        const exists = await dbUsers.findOne({ email });
        if (exists) {
            return 'El usuario ya existe';
        }
    
        const isAdmin = email.startsWith('admin');
    
        const user = {
            nombre,
            apellido,
            email,
            edad,
            contrasenia,
            rol: isAdmin ? 'admin' : 'user'
        };
    
        const result = await dbUsers.create(user);
        return `Usuario creado con id: ${result.id}`;
    }

    async login(email, contrasenia) {
        const user = await dbUsers.findOne({ email, contrasenia });
        if (!user) return "Credenciales incorrectas";
        let sessionUser = {
            nombre: `${user.nombre} ${user.apellido}`,
            email: user.email,
            edad: user.edad
        }
        return "¡Primer logueo realizado! :)", sessionUser;
    }
}